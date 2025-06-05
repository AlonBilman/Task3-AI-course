import React, { useState } from 'react';
import { SavedState } from '../types/GameOfLife';

interface SavedStatesProps {
  savedStates: SavedState[];
  onLoad: (name: string) => void;
  onDelete: (name: string) => void;
  onSave: (name: string) => void;
}

const SavedStates: React.FC<SavedStatesProps> = ({ savedStates, onLoad, onDelete, onSave }) => {
  const [newStateName, setNewStateName] = useState('');

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    background: '#4299e1',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      background: '#3182ce',
    },
  };

  const inputStyle = {
    padding: '0.5rem',
    margin: '0.25rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    background: 'white',
    minWidth: '200px',
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '0.375rem',
    marginBottom: '0.5rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#f56565',
    ':hover': {
      background: '#e53e3e',
    },
  };

  return (
    <section style={{
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f7fafc',
      borderRadius: '0.5rem',
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: '1rem',
      }}>Saved States</h2>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={newStateName}
          onChange={e => setNewStateName(e.target.value)}
          placeholder="Enter state name"
          style={inputStyle}
          aria-label="New state name"
        />
        <button
          onClick={() => {
            if (newStateName.trim()) {
              onSave(newStateName.trim());
              setNewStateName('');
            }
          }}
          style={buttonStyle}
          aria-label="Save current state"
        >
          Save Current State
        </button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        {savedStates.map(state => (
          <div key={state.name} style={listItemStyle}>
            <span style={{
              flex: 1,
              color: '#4a5568',
              fontWeight: '500',
            }}>{state.name}</span>
            <button
              onClick={() => onLoad(state.name)}
              style={buttonStyle}
              aria-label={`Load state ${state.name}`}
            >
              Load
            </button>
            <button
              onClick={() => onDelete(state.name)}
              style={deleteButtonStyle}
              aria-label={`Delete state ${state.name}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedStates; 