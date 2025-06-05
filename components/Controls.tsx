import React, { useState } from 'react';
import { Pattern } from '../types/GameOfLife';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onStep: () => void;
  onRandomize: () => void;
  onClear: () => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (rows: number, cols: number) => void;
  patterns: Pattern[];
  onPatternSelect: (pattern: Pattern) => void;
  currentSpeed: number;
  currentRows: number;
  currentCols: number;
}

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onStop,
  onStep,
  onRandomize,
  onClear,
  onSpeedChange,
  onSizeChange,
  patterns,
  onPatternSelect,
  currentSpeed,
  currentRows,
  currentCols,
}) => {
  const [rows, setRows] = useState(currentRows);
  const [cols, setCols] = useState(currentCols);
  const [patternIdx, setPatternIdx] = useState(0);

  const handleSizeChange = () => {
    onSizeChange(rows, cols);
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    background: '#4299e1',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    background: '#a0aec0',
    cursor: 'not-allowed',
    opacity: 0.7,
  };

  const startButtonStyle = {
    ...buttonStyle,
    background: '#4299e1',
  };

  const stopButtonStyle = {
    ...buttonStyle,
    background: '#e53e3e',
  };

  const inputStyle = {
    padding: '0.5rem',
    margin: '0.25rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    background: 'white',
    width: '60px',
    transition: 'all 0.2s',
    ':disabled': {
      background: '#f7fafc',
      borderColor: '#cbd5e0',
      color: '#718096',
      cursor: 'not-allowed',
    },
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0.5rem',
    color: '#4a5568',
    transition: 'all 0.2s',
    ':disabled': {
      color: '#a0aec0',
    },
  };

  const selectStyle = {
    padding: '0.5rem',
    margin: '0.25rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    background: 'white',
    minWidth: '120px',
    transition: 'all 0.2s',
    ':disabled': {
      background: '#f7fafc',
      borderColor: '#cbd5e0',
      color: '#718096',
      cursor: 'not-allowed',
    },
  };

  return (
    <section style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: '1rem',
      background: '#f7fafc',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <button
        onClick={isRunning ? onStop : onStart}
        disabled={false}
        style={isRunning ? stopButtonStyle : startButtonStyle}
        aria-label={isRunning ? 'Stop' : 'Start'}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button 
        onClick={onStep} 
        disabled={isRunning} 
        style={isRunning ? disabledButtonStyle : buttonStyle}
        aria-label="Step"
      >
        Step
      </button>
      <button 
        onClick={onRandomize} 
        disabled={isRunning} 
        style={isRunning ? disabledButtonStyle : buttonStyle}
        aria-label="Randomize"
      >
        Randomize
      </button>
      <button 
        onClick={onClear} 
        disabled={isRunning} 
        style={isRunning ? disabledButtonStyle : buttonStyle}
        aria-label="Clear"
      >
        Clear
      </button>
      <label style={labelStyle}>
        Speed:
        <input
          type="range"
          min={50}
          max={1000}
          step={10}
          value={currentSpeed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          aria-valuenow={currentSpeed}
          aria-valuemin={50}
          aria-valuemax={1000}
          style={{ 
            width: '150px',
            cursor: 'pointer',
            opacity: 1,
          }}
        />
        {currentSpeed} ms
      </label>
      <label style={{
        ...labelStyle,
        opacity: isRunning ? 0.7 : 1,
      }}>
        Rows:
        <input
          type="number"
          min={10}
          max={60}
          value={rows}
          onChange={e => setRows(Number(e.target.value))}
          onBlur={e => {
            const value = Math.min(60, Math.max(10, Number(e.target.value)));
            setRows(value);
          }}
          style={{
            ...inputStyle,
            opacity: isRunning ? 0.7 : 1,
            cursor: isRunning ? 'not-allowed' : 'text',
            background: isRunning ? '#f7fafc' : 'white',
          }}
          disabled={isRunning}
        />
      </label>
      <label style={{
        ...labelStyle,
        opacity: isRunning ? 0.7 : 1,
      }}>
        Cols:
        <input
          type="number"
          min={10}
          max={60}
          value={cols}
          onChange={e => setCols(Number(e.target.value))}
          onBlur={e => {
            const value = Math.min(60, Math.max(10, Number(e.target.value)));
            setCols(value);
          }}
          style={{
            ...inputStyle,
            opacity: isRunning ? 0.7 : 1,
            cursor: isRunning ? 'not-allowed' : 'text',
            background: isRunning ? '#f7fafc' : 'white',
          }}
          disabled={isRunning}
        />
      </label>
      <button
        onClick={handleSizeChange}
        disabled={isRunning}
        style={{
          ...buttonStyle,
          opacity: isRunning ? 0.7 : 1,
          cursor: isRunning ? 'not-allowed' : 'pointer',
        }}
        aria-label="Apply Size"
      >
        Apply Size
      </button>
      <select
        value={patternIdx}
        onChange={e => {
          setPatternIdx(Number(e.target.value));
          onPatternSelect(patterns[Number(e.target.value)]);
        }}
        style={{
          ...selectStyle,
          opacity: isRunning ? 0.7 : 1,
          cursor: isRunning ? 'not-allowed' : 'pointer',
          background: isRunning ? '#f7fafc' : 'white',
        }}
        disabled={isRunning}
      >
        {patterns.map((pattern, idx) => (
          <option key={pattern.name} value={idx}>
            {pattern.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Controls; 