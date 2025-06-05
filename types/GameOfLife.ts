/**
 * Cell state: alive (1) or dead (0)
 */
export type CellState = 0 | 1;

/**
 * Represents a single cell in the game board.
 * Currently only contains the cell state, but could be extended with additional properties.
 */
export interface Cell {
  state: CellState;
}

/**
 * The game board represented as a 2D array of cell states.
 * Each cell can be either alive (1) or dead (0).
 */
export type Board = CellState[][];

/**
 * Represents a predefined pattern that can be placed on the board.
 * Patterns are used to create interesting initial configurations.
 */
export interface Pattern {
  /** Name of the pattern (e.g., "Glider", "Blinker") */
  name: string;
  /** 2D array representing the pattern's shape, where 1 is alive and 0 is dead */
  cells: CellState[][];
}

/**
 * Represents a saved game state with metadata.
 * Used to save and restore board configurations.
 */
export interface SavedState {
  /** Unique name to identify the saved state */
  name: string;
  /** The board configuration at the time of saving */
  board: Board;
  /** Timestamp when the state was saved (milliseconds since epoch) */
  createdAt: number;
  /** Game settings at the time of saving */
  settings: GameSettings;
}

/**
 * Game configuration settings that control the simulation.
 */
export interface GameSettings {
  /** Number of rows in the game board */
  rows: number;
  /** Number of columns in the game board */
  cols: number;
  /** Simulation speed in milliseconds per step */
  speed: number;
} 