# Conway's Game of Life

A React + TypeScript implementation of Conway's Game of Life with a graphical user interface.

## Quick Start

1. **Clone the repository**
   ```sh
   git clone https://github.com/AlonBilman/Task3-AI-course.git
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

### Basic Controls
- Click **Start** to begin the simulation
- Click **Stop** to pause
- Use **Step** to advance one generation at a time
- Click **Randomize** to create a random pattern
- Click **Clear** to reset the grid

### Grid Interaction
- Click any cell to toggle it between alive and dead (when simulation is stopped)
- Adjust grid size using the row and column inputs (10-60 cells)
- Click **Apply Size** to update the grid dimensions

### Speed Control
- Use the speed slider to adjust simulation speed
- Range: 50ms (fast) to 1000ms (slow)

### Patterns
Select from 6 predefined patterns:
- Glider
- Pulsar
- Heart
- Flower
- Circle
- None (empty grid)

### Saving States
- Enter a name for your current board state
- Click **Save Current State** to store it
- Use **Load** to restore a saved state
- Use **Delete** to remove unwanted states

## Project Structure
```
.
├── components/     # React components
│   ├── Controls.tsx
│   ├── Grid.tsx
│   └── SavedStates.tsx
├── controller/     # Game controller
│   └── GameController.ts
├── model/         # Game model and patterns
│   ├── GameModel.ts
│   └── patterns.ts
├── types/         # TypeScript types
│   └── GameOfLife.ts
├── view/          # Main view components
│   ├── App.tsx
│   └── index.tsx
├── public/        # Static assets
├── dist/          # Build output
├── webpack.config.js
├── tsconfig.json
└── package.json
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
