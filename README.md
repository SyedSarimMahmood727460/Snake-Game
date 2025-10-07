-----------------
## Snake Game ##
-----------------

A modern, feature-rich Snake game built with Next.js, TypeScript, and Tailwind CSS. Classic gameplay with customizable settings and multiple game modes.

### Features
-------------

## Core Gameplay ##
- **Classic Snake Mechanics** - Control the snake to eat food and grow longer
- **Collision Detection** - Game ends when hitting walls, bombs, or yourself
- **Dynamic Scoring** - Earn 10 points per food item consumed
- **Multiple Food Items** - Support for multiple food items on the board simultaneously
- **Bombs** - Avoid dangerous bombs that end the game on contact
- **Responsive Grid** - Game board adapts to different screen sizes

## Game Modes ##
- **Walls Solid** - Traditional mode where hitting walls ends the game
- **Wrap Mode** - Snake teleports to the opposite edge when reaching boundaries

### Customization Options
--------------------------

## Grid Settings ##
- Adjustable grid size (10×10 to 40×40)
- Dynamic cell sizing based on viewport

## Speed Control ##
- Speed range: 50ms (Very Fast) to 500ms (Slow)
- Real-time speed adjustment

## Spawn Configuration ##
- **Initial Food Count** - Set 1-10 food items at game start
- **Initial Bomb Count** - Set 0-10 bombs at game start
- **Auto-spawn Bombs** - Toggle automatic bomb spawning during gameplay
- **Bomb Spawn Interval** - Configure bomb spawn frequency (every 10-100 points)

### Controls
-------------
- **Arrow Keys** or **WASD** - Move snake (Up/Down/Left/Right)
- **Spacebar** - Pause/Resume game
- **Start Button** - Begin gameplay
- **Reset Button** - Restart game with current settings

   # Can add... #
- **+Food Button** - Manually spawn additional food
- **+Bomb Button** - Manually spawn additional bombs

----------------------
## Getting Started ##
----------------------

### Prerequisites
------------------
- Node.js 18+ installed
- npm or yarn package manager

### Installation
-----------------

1. **Clone the project or else**
```bash
git clone git@github.com:SyedSarimMahmood727460/Snake-Game.git
cd Snake-game
```

2. **Install dependencies**
```bash
npm install
npm install zustand
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
snake-game/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── play/
│   │   │   └── page.tsx        # Game board page
│   │   ├── settings/
│   │   │   └── page.tsx        # Settings page
│   │   └── leaderboard/
│   │       └── page.tsx        # Leaderboard page
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── GameCanvas.tsx      # Game grid renderer
│   │   └── HudBar.tsx          # Game info sidebar
│   ├── store/
│   │   └── gameStore.ts        # Zustand state management
│   ├── types/
│   │   └── game.ts             # TypeScript types
│   └── hooks/
│       └── useKeyboardInput.ts # Keyboard controls
├── public/
├── package.json
└── README.md
```

### How to Play 
----------------

1. **Navigate to Play page** from the home screen
2. **Click "Start"** to begin the game
3. **Use arrow keys or WASD** to control the snake
4. **Eat food (🍎)** to grow and increase score
5. **Avoid bombs (💣)** and collisions
6. **Press Spacebar** to pause/resume
7. **Adjust settings** anytime to customize your experience

### Technology Stack
---------------------

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: Next.js App Router

### Configuration
------------------

## Game Settings (Accessible via Settings Page) ##

| Setting | Range | Default | Description |
|---------|-------|---------|-------------|
| Game Mode | Walls Solid / Wrap | Walls Solid | Collision behavior |
| Speed | 50-500ms | 200ms | Tick interval |
| Grid Rows | 10-40 | 20 | Vertical cells |
| Grid Columns | 10-40 | 20 | Horizontal cells |
| Initial Food | 1-10 | 2 | Starting food items |
| Initial Bombs | 0-10 | 2 | Starting bombs |
| Auto-spawn Bombs | On/Off | On | Dynamic difficulty |
| Bomb Interval | 10-100pts | 50pts | Spawn frequency |

### Features in Detail
-----------------------

## Collision System ##
- **Self-collision** - Snake dies when hitting its own body
- **Wall collision** - In Walls Solid mode, hitting edges ends game
- **Bomb collision** - Instant game over on contact
- **Wrap teleportation** - In Wrap mode, seamlessly move across edges

## Scoring System ##
- **+10 points** per food item eaten
- Score tracked in real-time
- High scores displayed on home page (placeholder for future implementation)

## Visual Design ##
- **Checkerboard grid** - Easy-to-see game board
- **Distinct snake head** - Darker shade with eye emoji (👁️)
- **Color-coded items**:
  - Snake: Green (head: darker, body: lighter)
  - Food: Red with pulse animation
  - Bombs: Gray with shadow effect

## Responsive Design ##
- Mobile-friendly layout ( yes, checked on inspect mode)
- Adaptive cell sizing
- Touch-friendly buttons
- Stacked layout on small screens

## Known Issues & Limitations ##

- Leaderboard is currently a placeholder (no persistence)
- Maximum 20 bombs can exist simultaneously
- Food/bomb spawn may overlap on very small grids with many items
- UI color issue on dark mode

## Future Enhancements ##
( i just typed these, will change these later depends upon the document)

- [ ] Persistent high scores (localStorage/database)
- [ ] Power-ups (speed boost, invincibility, etc.)
- [ ] Difficulty levels (Easy/Medium/Hard presets)
- [ ] Sound effects and music
- [ ] Multiplayer mode
- [ ] Custom themes/skins
- [ ] Mobile touch controls

### Development Notes 
---------------------

## State Management ##
The game uses Zustand for centralized state management with the following key functions:
- `tick()` - Main game loop logic
- `setDirection()` - Handles snake movement with 180° turn prevention
- `resetGame()` - Reinitializes game state
- `setConfig()` - Updates spawn configuration

## Game Loop ##
- Runs via `setInterval` when `running === true`
- Interval controlled by `speedMs` setting
- Automatically pauses on game over

## Hydration Fix ##
GameCanvas uses `useState` and `useEffect` to prevent Next.js SSR hydration mismatches with dynamic cell sizing.

## Enjoy the game! ##
