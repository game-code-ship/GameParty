# Party games

Six realtime multiplayer games, played on phones with a room code or QR. No player limit.
Mafia, Imposter, Draw & Guess, Color Match, Most Likely To, Pictionary. Scores are tracked per room across rounds.

## Run it
1. Install Node.js 18+
2. `npm install` then `npm start`
3. Open the "Same Wi-Fi" address it prints on the HOST device (not localhost) so the QR works for phones.

## Play anywhere
Deploy this folder to any Node host (Render, Railway, Fly.io, a VPS). It uses the PORT env var.

## Add a game
Add an entry to `GAMES` and `DEF`, a case in `startRound`/`ACT.start`, a branch in `tick()` (referee, host device), and a view.

## Pictionary
One player draws a secret word and everyone else sees the strokes live and types guesses in the chat.
If a guess is part of the word (for example "rain" for "rainbow"), those letters get locked into the hint for everyone
and the guesser earns a point. Chat history is kept for the whole room, including the lobby and between turns.
The server keeps two small append-only logs per room (strokes and chat) so late joiners see the full drawing and old chat.