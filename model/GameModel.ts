import { Board, Pattern, SavedState, GameSettings, CellState } from '../types/GameOfLife';

/**
 * GameModel class that manages the core game logic and state for Conway's Game of Life.
 * Handles board operations, pattern applications, and state management.
 */
export class GameModel {
  private board: Board;
  private settings: GameSettings;
  private patterns: Pattern[];
  private savedStates: SavedState[] = [];

  /**
   * Creates a new GameModel instance with the specified settings and patterns.
   * @param settings - Initial game settings (board size and speed)
   * @param patterns - Available predefined patterns
   */
  constructor(settings: GameSettings, patterns: Pattern[]) {
    this.settings = settings;
    this.patterns = patterns;
    this.board = this.createEmptyBoard(settings.rows, settings.cols);
  }

  /**
   * Returns a deep copy of the current board state.
   * @returns A 2D array representing the current board state
   */
  getBoard(): Board {
    return this.board.map(row => [...row]);
  }

  /**
   * Returns a copy of the current game settings.
   * @returns Current game settings
   */
  getSettings(): GameSettings {
    return { ...this.settings };
  }

  /**
   * Updates the board state with a new board configuration.
   * @param board - New board configuration to apply
   */
  setBoard(board: Board) {
    this.board = board.map(row => [...row]);
  }

  /**
   * Updates the game settings and resets the board if dimensions change.
   * @param settings - New game settings to apply
   */
  setSettings(settings: GameSettings) {
    const sizeChanged = settings.rows !== this.settings.rows || settings.cols !== this.settings.cols;
    this.settings = { ...settings };
    if (sizeChanged) {
      this.board = this.createEmptyBoard(settings.rows, settings.cols);
    }
  }

  /**
   * Creates a new empty board with the specified dimensions.
   * @param rows - Number of rows in the board
   * @param cols - Number of columns in the board
   * @returns A new empty board filled with dead cells (0)
   */
  createEmptyBoard(rows: number, cols: number): Board {
    return Array.from({ length: rows }, () => Array(cols).fill(0) as CellState[]);
  }

  /**
   * Randomizes the board state, setting each cell to alive (1) with 30% probability.
   */
  randomizeBoard() {
    this.board = this.board.map(row => row.map(() => (Math.random() > 0.7 ? 1 : 0)));
  }

  /**
   * Clears the board, setting all cells to dead (0).
   */
  clearBoard() {
    this.board = this.createEmptyBoard(this.settings.rows, this.settings.cols);
  }

  /**
   * Toggles the state of a cell at the specified position.
   * @param row - Row index of the cell
   * @param col - Column index of the cell
   */
  toggleCell(row: number, col: number) {
    if (row < 0 || row >= this.settings.rows || col < 0 || col >= this.settings.cols) return;
    this.board[row][col] = this.board[row][col] ? 0 : 1;
  }

  /**
   * Advances the board by one generation according to Conway's Game of Life rules:
   * - Any live cell with two or three live neighbours survives.
   * - Any dead cell with three live neighbours becomes a live cell.
   * - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
   */
  step() {
    const { rows, cols } = this.settings;
    const next: Board = this.createEmptyBoard(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const alive = this.board[r][c] === 1;
        const neighbors = this.countNeighbors(r, c);
        if (alive) {
          next[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          next[r][c] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    this.board = next;
  }

  /**
   * Counts the number of live neighbors for a cell at the specified position.
   * @param row - Row index of the cell
   * @param col - Column index of the cell
   * @returns Number of live neighbors (0-8)
   */
  countNeighbors(row: number, col: number): number {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < this.settings.rows && c >= 0 && c < this.settings.cols) {
          count += this.board[r][c];
        }
      }
    }
    return count;
  }

  /**
   * Returns the list of available predefined patterns.
   * @returns Array of available patterns
   */
  getPatterns(): Pattern[] {
    return this.patterns;
  }

  /**
   * Applies a pattern to the board, centered at the specified position.
   * @param pattern - Pattern to apply
   * @param top - Top position for pattern placement
   * @param left - Left position for pattern placement
   */
  applyPattern(pattern: Pattern, top: number, left: number) {
    const { cells } = pattern;
    const centerRow = Math.floor(this.settings.rows / 2);
    const centerCol = Math.floor(this.settings.cols / 2);
    const patternHeight = cells.length;
    const patternWidth = cells[0].length;
    
    const startRow = centerRow - Math.floor(patternHeight / 2);
    const startCol = centerCol - Math.floor(patternWidth / 2);

    for (let r = 0; r < cells.length; r++) {
      for (let c = 0; c < cells[0].length; c++) {
        const boardR = startRow + r;
        const boardC = startCol + c;
        if (
          boardR >= 0 && boardR < this.settings.rows &&
          boardC >= 0 && boardC < this.settings.cols
        ) {
          this.board[boardR][boardC] = cells[r][c];
        }
      }
    }
  }

  /**
   * Saves the current board state with the specified name.
   * @param name - Name to identify the saved state
   */
  saveState(name: string) {
    const saved: SavedState = {
      name,
      board: this.getBoard(),
      createdAt: Date.now(),
      settings: this.getSettings()
    };
    const filtered = this.savedStates.filter(s => s.name !== name);
    filtered.push(saved);
    this.savedStates = filtered;
  }

  /**
   * Returns all saved states.
   * @returns Array of saved states
   */
  getSavedStates(): SavedState[] {
    return this.savedStates;
  }

  /**
   * Loads a saved state by name.
   * @param name - Name of the state to load
   * @returns true if the state was loaded successfully, false otherwise
   */
  loadState(name: string): boolean {
    const found = this.savedStates.find(s => s.name === name);
    if (found) {
      this.setSettings(found.settings);
      this.setBoard(found.board);
      return true;
    }
    return false;
  }

  /**
   * Deletes a saved state by name.
   * @param name - Name of the state to delete
   */
  deleteState(name: string) {
    this.savedStates = this.savedStates.filter(s => s.name !== name);
  }
} 