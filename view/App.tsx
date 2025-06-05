import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameModel } from '../model/GameModel';
import { GameController } from '../controller/GameController';
import { patterns } from '../model/patterns';
import { Board, GameSettings, Pattern } from '../types/GameOfLife';
import Grid from '../components/Grid';
import Controls from '../components/Controls';
import SavedStates from '../components/SavedStates';

const DEFAULT_SETTINGS: GameSettings = {
  rows: 40,
  cols: 40,
  speed: 200,
};

const App: React.FC = () => {
  const modelRef = useRef(new GameModel(DEFAULT_SETTINGS, patterns));
  const controllerRef = useRef(new GameController(modelRef.current));

  const [board, setBoard] = useState<Board>(modelRef.current.getBoard());
  const [settings, setSettings] = useState<GameSettings>(modelRef.current.getSettings());
  const [savedStates, setSavedStates] = useState(modelRef.current.getSavedStates());
  const [isRunning, setIsRunning] = useState(false);

  // Apply initial Glider pattern
  useEffect(() => {
    controllerRef.current.applyPattern(patterns[4], 1, 1);
  }, []);

  // Subscribe to controller state changes
  useEffect(() => {
    const listener = (b: Board, s: GameSettings) => {
      setBoard(b);
      setSettings(s);
      setSavedStates(modelRef.current.getSavedStates());
      setIsRunning(controllerRef.current.isRunning());
    };
    controllerRef.current.subscribe(listener);
    // Initial state
    listener(modelRef.current.getBoard(), modelRef.current.getSettings());
    return () => {
      controllerRef.current.unsubscribe(listener);
    };
  }, []);

  // Handlers
  const handleCellClick = useCallback((row: number, col: number) => {
    controllerRef.current.toggleCell(row, col);
  }, []);

  const handleStart = useCallback(() => controllerRef.current.start(), []);
  const handleStop = useCallback(() => controllerRef.current.stop(), []);
  const handleStep = useCallback(() => controllerRef.current.step(), []);
  const handleRandomize = useCallback(() => controllerRef.current.randomize(), []);
  const handleClear = useCallback(() => controllerRef.current.clear(), []);
  const handleSpeedChange = useCallback((speed: number) => controllerRef.current.setSpeed(speed), []);
  const handleSizeChange = useCallback((rows: number, cols: number) => controllerRef.current.setSize(rows, cols), []);
  const handlePatternSelect = useCallback((pattern: Pattern) => {
    controllerRef.current.clear();
    if (pattern.cells.length > 0) {
      controllerRef.current.applyPattern(pattern, 1, 1);
    }
  }, []);
  const handleSave = useCallback((name: string) => controllerRef.current.saveState(name), []);
  const handleLoad = useCallback((name: string) => controllerRef.current.loadState(name), []);
  const handleDelete = useCallback((name: string) => controllerRef.current.deleteState(name), []);

  return (
    <main style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      minHeight: '100vh',
      color: '#2c3e50',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '2rem',
        color: '#1a202c',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      }}>Conway's Game of Life</h1>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }}>
        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
          onStep={handleStep}
          onRandomize={handleRandomize}
          onClear={handleClear}
          onSpeedChange={handleSpeedChange}
          onSizeChange={handleSizeChange}
          patterns={patterns}
          onPatternSelect={handlePatternSelect}
          currentSpeed={settings.speed}
          currentRows={settings.rows}
          currentCols={settings.cols}
        />
        <Grid
          board={board}
          isRunning={isRunning}
          onCellClick={handleCellClick}
        />
        <SavedStates
          savedStates={savedStates}
          onLoad={handleLoad}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      </div>
    </main>
  );
};

export default App; 