# Party games

Twelve realtime multiplayer games, played on phones with a room code or QR. No player limit.
Mafia, Imposter, Draw & Guess, Color Match, Most Likely To, Dumb Charades, Quick Trivia, Would You Rather, Two Truths and a Lie, Fake Fact, Taboo, Name Place Animal Thing. Scores are tracked per room across rounds.

Every game shows a "How to play" section in the waiting room (the `HOW` map in `index.html`, one entry per game id).

## Two Truths and a Lie (3+)
One player per round writes three statements and marks the lie. The others vote on a shuffled list. +1 per correct guess, writer +2 per player fooled. Everyone writes once before anyone repeats.

## Fake Fact (3+)
Everyone writes a fake answer to a quirky question; fakes and the real answer are shuffled and everyone picks the real one. +2 for the truth, +1 per player your fake fools. Fakes matching the real answer (or its alternates) are rejected, and identical fakes are merged. Questions live in `FACTS` (`Question with ___|Answer|alt;alt`).

## Taboo (4+, Red vs Blue)
Teams alternate timed turns. The describer taps Got it (+1), Buzz (-1) or Skip (free, max 3). The other team's phones show the card so they can shout when a banned word slips out. Cards live in `TABOO` (`Word|ban|ban|ban|ban`). Teams and team scores carry over when you go back to the lobby.

## Mafia: anonymous roles
Host lobby toggle, ON by default. ON: nobody knows anyone else's role. OFF: teammates see each other
(mafia see mafia, doctors see doctors, police see police) at the role reveal and during the night.

## Dumb Charades
Players take turns acting. The host picks Bollywood, Hollywood or both, and the seconds per turn.
The actor taps to reveal the movie, its stars and what makes it unique. Not happy with it? **Change movie** swaps it for another one (the timer keeps running). Then the actor confirms who guessed it
(+2 guesser, +1 actor).
Team mode toggle (needs 4+ players): players are split into Red and Blue, teams alternate turns, only the
actor's teammates can guess, and the acting team scores +3. Off = free for all. Everyone sees the full movie card after each round.
Movies live in the `MOVIES` list in `index.html` (`B|Title|Year|Actors|Unique style`), easy to extend.

## Quick Trivia (fastest finger first)
Multiple-choice questions on every phone. Only the first correct answer scores (+2) and the round ends right then. Each player gets one answer per question, so a wrong tap locks you out.
Order is decided by a server timestamp (`_ts`, added in `server.js`), so phone clocks can't cheat. If nobody gets it right before the timer ends, nobody scores.
The host sets seconds per question and **how many questions to play** (5, 10, 15, 20, 30 or endless). After the last question the final scores for that game are shown. Questions live in the `QS` list in `index.html` (`Question|Correct|Wrong|Wrong|Wrong`, options are shuffled each round).

## Would You Rather
Everyone picks A or B on a dilemma. Everyone on the majority side gets +1 (a tie scores nobody). Needs 3+ players. The host picks how many questions to play (5 to 30, or endless) and the final scores are shown after the last one.
Dilemmas live in the `WYRS` list in `index.html` (`Option A|Option B`).

## Name Place Animal Thing (2+)
Each round the game picks a random letter (never repeated within a game; Q, U, X, Y, Z are left out). Everyone writes a Name, a Place, an Animal and a Thing starting with it. Done only unlocks once all four fields start with the letter. **The first Done stops the round for everyone**: all other phones submit whatever they have typed (the server timestamp decides who was first). If nobody taps Done, the round ends when the timer does.

Then the game verifies every answer against its word lists and shows what everyone wrote:
- spelled correctly: **10** points
- spelling slip (one or two letters off, a swapped pair, etc.): **5** points, and the correct spelling is shown
- not in the lists, wrong first letter, or blank: **0**

The lists can't know every real word, so the **host can tap a "Not found" or misspelled answer to accept it** as correct (tap again to undo). The host sets seconds per round and the number of rounds (3, 5, 8, 10, 15 or endless).
Word lists live in `NPW` (one line per letter, `Letter: word,word,...`; Name, Place, Animal, Thing) near the top of `index.html`. Add words any time. The point values are `NP_OK` and `NP_SP`.

## Run it
1. Install Node.js 18+
2. `npm install` then `npm start`
3. Open the "Same Wi-Fi" address it prints on the HOST device (not localhost) so the QR works for phones.

## Play anywhere
Deploy this folder to any Node host (Render, Railway, Fly.io, a VPS). It uses the PORT env var.

## Add a game
Add an entry to `GAMES` and `DEF`, a case in `startRound`/`ACT.start`, a branch in `tick()` (referee, host device), and a view.
