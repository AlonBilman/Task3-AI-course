import { GameModel } from '../model/GameModel';
import { Board, GameSettings, Pattern } from '../types/GameOfLife';

type StateListener = (board: Board, settings: GameSettings) => void;

/**
 * GameController class that manages the game simulation and coordinates between the Model and View.
 * Handles the game loop, user interactions, and state updates.
 */
export class GameController {
  private model: GameModel;
  private listeners: StateListener[] = [];
  private intervalId: number | null = null;

  /**
   * Creates a new GameController instance.
   * @param model - The game model to control
   */
  constructor(model: GameModel) {
    this.model = model;
  }

  /**
   * Subscribes a listener to state changes.
   * @param listener - Function to call when state changes
   */
  subscribe(listener: StateListener) {
    this.listeners.push(listener);
  }

  /**
   * Unsubscribes a listener from state changes.
   * @param listener - Function to remove from listeners
   */
  unsubscribe(listener: StateListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notifies all listeners of the current state.
   */
  private notify() {
    const board = this.model.getBoard();
    const settings = this.model.getSettings();
    this.listeners.forEach(listener => listener(board, settings));
  }

  /**
   * Starts the game simulation.
   * The simulation will advance the board state at the configured speed.
   */
  start() {
    if (this.intervalId !== null) return;
    this.intervalId = window.setInterval(() => {
      this.model.step();
      this.notify();
    }, this.model.getSettings().speed);
    this.notify();
  }

  /**
   * Stops the game simulation.
   */
  stop() {
    if (this.intervalId === null) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
    this.notify();
  }

  /**
   * Advances the game by one step.
   */
  step() {
    this.model.step();
    this.notify();
  }

  /**
   * Randomizes the board state.
   */
  randomize() {
    this.model.randomizeBoard();
    this.notify();
  }

  /**
   * Clears the board.
   */
  clear() {
    this.model.clearBoard();
    this.notify();
  }

  /**
   * Toggles the state of a cell at the specified position.
   * @param row - Row index of the cell
   * @param col - Column index of the cell
   */
  toggleCell(row: number, col: number) {
    this.model.toggleCell(row, col);
    this.notify();
  }

  /**
   * Updates the game settings.
   * @param settings - New game settings to apply
   */
  updateSettings(settings: GameSettings) {
    this.model.setSettings(settings);
    this.notify();
  }

  /**
   * Saves the current game state.
   * @param name - Name to identify the saved state
   */
  saveState(name: string) {
    this.model.saveState(name);
    this.notify();
  }

  /**
   * Returns all saved states.
   * @returns Array of saved states
   */
  getSavedStates() {
    return this.model.getSavedStates();
  }

  /**
   * Loads a saved state.
   * @param name - Name of the state to load
   * @returns true if the state was loaded successfully, false otherwise
   */
  loadState(name: string): boolean {
    const success = this.model.loadState(name);
    if (success) {
      this.notify();
    }
    return success;
  }

  /**
   * Deletes a saved state.
   * @param name - Name of the state to delete
   */
  deleteState(name: string) {
    this.model.deleteState(name);
    this.notify();
  }

  /**
   * Checks if the game simulation is currently running.
   * @returns true if the simulation is running, false otherwise
   */
  isRunning() {
    return this.intervalId !== null;
  }

  setSpeed(speed: number) {
    const settings = this.model.getSettings();
    this.model.setSettings({ ...settings, speed });
    if (this.intervalId !== null) {
      this.stop();
      this.start();
    }
    this.notify();
  }

  setSize(rows: number, cols: number) {
    const settings = this.model.getSettings();
    this.model.setSettings({ ...settings, rows, cols });
    this.notify();
  }

  applyPattern(pattern: Pattern, top: number, left: number) {
    this.model.applyPattern(pattern, top, left);
    this.notify();
  }

  getPatterns() {
    return this.model.getPatterns();
  }
} 