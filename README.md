# Conway's Game of Life (React + TypeScript, MVC)

## Setup & Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the app:**
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture Overview

This project uses a strict **Model-View-Controller (MVC)** pattern:

- **Model** (`/model/GameModel.ts`, `/model/patterns.ts`):
  - Manages all game data, rules, and board state
  - Handles step logic, pattern library, and saving/loading to localStorage
  - Exposes clean, typed interfaces for state manipulation

- **Controller** (`/controller/GameController.ts`):
  - Orchestrates between Model and View
  - Handles user actions, simulation timer, and state subscriptions
  - Exposes a clean API for the View to call

- **View** (`/view/App.tsx`, `/components/`):
  - Pure React functional components (TypeScript)
  - Renders the grid, controls, and saved states
  - No business logic; delegates all logic to the Controller/Model

- **Types** (`/types/GameOfLife.ts`):
  - Centralized TypeScript types/interfaces for all layers

---

## Saving & Restoring Board States

- **Save:** Enter a custom name and click "Save". The current board is stored in `localStorage`.
- **Load:** Click "Load" next to a saved state to restore it.
- **Delete:** Click "Delete" to remove a saved state.
- All saved states persist in your browser until deleted.

---

## React + TypeScript Design Decisions

- **Functional Components & Hooks:** All UI is built with React functional components and hooks (`useState`, `useEffect`, `useCallback`).
- **No Business Logic in View:** All game logic is in the Model/Controller, not in React components.
- **Typed Interfaces:** All data and props are strictly typed for safety and clarity.
- **Performance:** `React.memo` is used for the grid to avoid unnecessary re-renders.
- **Accessibility:** ARIA roles, labels, and keyboard navigation are provided for all controls and the grid.
- **Responsiveness:** The UI adapts to different screen sizes and is usable on desktop and mobile.
- **SOLID Principles:** Code is modular, single-responsibility, and easy to extend.

---

## Key Files

- `types/GameOfLife.ts` — TypeScript types/interfaces
- `model/GameModel.ts` — Game logic, board state, patterns, save/load
- `model/patterns.ts` — Predefined patterns (glider, pulsar, etc.)
- `controller/GameController.ts` — Orchestrates between Model and View
- `components/Grid.tsx` — Renders the game grid
- `components/Controls.tsx` — Simulation controls (start, stop, speed, size, patterns)
- `components/SavedStates.tsx` — Save/load/delete board states
- `view/App.tsx` — Main React app, wires everything together
- `view/index.tsx` — React entry point

---

## Example: Controller Initialization

```tsx
// In App.tsx
const modelRef = useRef(new GameModel(DEFAULT_SETTINGS, patterns));
const controllerRef = useRef(new GameController(modelRef.current));

useEffect(() => {
  const listener = (b, s) => { /* update state */ };
  controllerRef.current.subscribe(listener);
  return () => controllerRef.current.unsubscribe(listener);
}, []);
```

---

## Notes
- No plain JavaScript: 100% TypeScript
- No class-based React components
- No business logic in View
- No external state libraries (uses hooks only)
- Fully modular and maintainable 