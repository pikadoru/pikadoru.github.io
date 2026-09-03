# pikadoru.github.io

A React + Vite + TypeScript site for games, minigames, tools, and API-backed information pages.

## Development

```bash
npm install
npm run dev
```

## Routes

- `/` — home page
- `/games` — games index
- `/games/minigames` — minigames index
- `/games/minigames/tic-tac-toe` — tic-tac-toe

The site uses a feature-oriented structure. Route pages stay thin, while reusable behavior belongs in `src/features`, API access belongs in `src/services/api`, and shared UI belongs in `src/components`.

### Tic-tac-toe flow

1. Select a mode: local two-player, versus computer, or online.
2. Play the game.
3. After a win or draw, play again, select another mode, return to minigames, or return home.

Online mode is currently presented as a coming-soon state; it will need a multiplayer service before it can start a match.

## Build

```bash
npm run build
npm run preview
```