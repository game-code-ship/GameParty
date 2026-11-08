# Party games

Five realtime multiplayer games, played on phones with a room code or QR. No player limit.
Mafia, Imposter, Draw & Guess, Color Match, Most Likely To. Scores are tracked per room across rounds.

## Run it
1. Install Node.js 18+
2. `npm install` then `npm start`
3. Open the "Same Wi-Fi" address it prints on the HOST device (not localhost) so the QR works for phones.

## Play anywhere
Deploy this folder to any Node host (Render, Railway, Fly.io, a VPS). It uses the PORT env var.

## Add a game
Add an entry to `GAMES` and `DEF`, a case in `startRound`/`ACT.start`, a branch in `tick()` (referee, host device), and a view.
