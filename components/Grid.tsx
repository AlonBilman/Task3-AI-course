import React from 'react';
import { Board } from '../types/GameOfLife';

interface GridProps {
  board: Board;
  isRunning: boolean;
  onCellClick: (row: number, col: number) => void;
}

const styles = {
  cell: {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'background 0.2s',
    padding: 0,
    margin: 0,
  },
  cellAlive: {
    background: '#1976d2',
  },
  cellDead: {
    background: '#fff',
  },
  cellHover: {
    background: '#aee1f9',
  },
  cellFocus: {
    boxShadow: '0 0 0 2px #1976d2',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
  },
  grid: {
    display: 'grid',
    border: '2px solid #1976d2',
    borderRadius: '4px',
    width: '100%',
    aspectRatio: '1',
    maxWidth: '800px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
    gap: '1px',
    padding: '1px',
  },
} as const;

const Grid: React.FC<GridProps> = React.memo(({ board, isRunning, onCellClick }) => {
  return (
    <div style={styles.container}>
      <div
        role="grid"
        aria-label="Game of Life grid"
        style={{
          ...styles.grid,
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
          gridTemplateColumns: `repeat(${board[0]?.length || 0}, 1fr)`,
        }}
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              role="gridcell"
              aria-label={`Cell ${rIdx + 1}, ${cIdx + 1} ${cell ? 'alive' : 'dead'}`}
              tabIndex={0}
              disabled={isRunning}
              onClick={() => !isRunning && onCellClick(rIdx, cIdx)}
              style={{
                ...styles.cell,
                ...(cell ? styles.cellAlive : styles.cellDead),
              }}
              onMouseEnter={(e) => {
                if (!isRunning) {
                  e.currentTarget.style.background = '#aee1f9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isRunning) {
                  e.currentTarget.style.background = cell ? '#1976d2' : '#fff';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px #1976d2';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default Grid; 