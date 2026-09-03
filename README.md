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

Online mode connects to the private backend configured with `VITE_ONLINE_API_ORIGIN`. Copy `.env.example` to `.env`, set the HTTPS ngrok origin, and rebuild the static site. The backend is maintained outside this public repository.

For GitHub Actions deployments, add a repository variable named `VITE_ONLINE_API_ORIGIN` under **Settings → Secrets and variables → Actions → Variables**. Set it to the HTTPS ngrok origin. This is public frontend configuration, not a secret; never add database credentials or admin tokens there.

## Build

```bash
npm run build
npm run preview
```