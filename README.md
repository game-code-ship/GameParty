# 🎉 GameParty

**Thirteen realtime multiplayer party games, played on phones with a room code or QR.**
No player limit. Scores are tracked per room across rounds.

🔗 **Live demo:** [game-party-tonight.vercel.app](https://game-party-tonight.vercel.app)

## ✨ Features

- 📱 Join from any phone with a room code or by scanning a QR
- 👥 No player limit, with scores tracked per room across rounds
- ❓ Floating **?** button on every screen with a "How to play" sheet for the current game
- 💬 Floating room chat on every screen: plain text, max 200 characters, last 100 messages kept, unread badge while closed
- ⏱️ Fair, server-timestamped ordering for fastest-finger games, so phone clocks can't cheat
- ⚙️ Host settings for each game (rounds, timers, modes)

## 🎮 Games

| Min. players | Games |
|---|---|
| **2+** | Color Match, Dumb Charades, Quick Trivia, Name Place Animal Thing, Housie |
| **3+** | Imposter, Draw & Guess, Most Likely To, Would You Rather, Two Truths and a Lie, Fake Fact |
| **4+** | Mafia, Taboo |

The home screen groups games automatically from the `min` value of each entry in `GAMES` in `index.html`.

<details>
<summary><b>Two Truths and a Lie (3+)</b></summary>

One player per round writes three statements and marks the lie. The others vote on a shuffled list. +1 per correct guess, and the writer gets +2 per player fooled. Everyone writes once before anyone repeats.
</details>

<details>
<summary><b>Fake Fact (3+)</b></summary>

Everyone writes a fake answer to a quirky question. The fakes and the real answer are shuffled, and everyone picks the real one. +2 for the truth, +1 per player your fake fools. Fakes matching the real answer (or its alternates) are rejected, and identical fakes are merged.
</details>

<details>
<summary><b>Taboo (4+, Red vs Blue)</b></summary>

Teams alternate timed turns. The describer taps **Got it** (+1), **Buzz** (-1) or **Skip** (free, max 3). The other team's phones show the card so they can shout when a banned word slips out. Teams and team scores carry over when you go back to the lobby.
</details>

<details>
<summary><b>Mafia (4+)</b></summary>

The host can toggle **anonymous roles** (on by default). When on, nobody knows anyone else's role. When off, teammates see each other (mafia see mafia, doctors see doctors, police see police) at the role reveal and during the night.
</details>

<details>
<summary><b>Dumb Charades</b></summary>

Players take turns acting. The host picks Bollywood, Hollywood or both, and the seconds per turn. The actor taps to reveal the movie, its stars and what makes it unique. **Change movie** swaps it for another one while the timer keeps running. The actor then confirms who guessed it (+2 guesser, +1 actor).

**Team mode** (needs 4+ players): players are split into Red and Blue, teams alternate turns, only the actor's teammates can guess, and the acting team scores +3. Off means free for all. Everyone sees the full movie card after each round.
</details>

<details>
<summary><b>Quick Trivia (fastest finger first)</b></summary>

Multiple-choice questions on every phone. Only the first correct answer scores (+2) and the round ends right then. Each player gets one answer per question, so a wrong tap locks you out. Order is decided by a server timestamp (`_ts`, added in `server.js`). If nobody gets it right before the timer ends, nobody scores.

The host sets seconds per question and the number of questions (5, 10, 15, 20, 30 or endless). Final scores are shown after the last question.
</details>

<details>
<summary><b>Would You Rather (3+)</b></summary>

Everyone picks A or B on a dilemma. Everyone on the majority side gets +1 (a tie scores nobody). The host picks how many questions to play (5 to 30, or endless), and final scores are shown after the last one.
</details>

<details>
<summary><b>Name Place Animal Thing (2+)</b></summary>

Each round a random letter is picked (never repeated within a game; Q, U, X, Y, Z are left out). Everyone writes a Name, a Place, an Animal and a Thing starting with it. **Done** only unlocks once all four fields start with the letter. The first Done stops the round for everyone, and the server timestamp decides who was first. If nobody taps Done, the round ends when the timer does.

**Peer review:** every player reviews one other player's answers, picked at random. Players are shuffled into a ring, so nobody reviews themselves and everyone is reviewed exactly once (with 2 players you review each other). The reviewer marks each answer:

| Mark | Points |
|---|---|
| Correct | 10 |
| Spelling mistake | 5 |
| Wrong | 0 |

Blank answers and answers starting with the wrong letter score 0 automatically. Reviewers have 45 seconds. Untouched answers count as Correct, and a reviewer who runs out of time is submitted as it stands, so one slow player never costs someone else points. The host sets seconds per round and the number of rounds (3, 5, 8, 10, 15 or endless).
</details>

<details>
<summary><b>Housie / Tambola (2+)</b></summary>

Every player gets 1 to 3 tickets (host setting): 3 rows by 9 columns, 5 numbers per row, 15 numbers from 1 to 90. The host's phone calls a random number every few seconds (default 6, and that phone must stay open). The host can pause, call the next number now, or end the game. Players tap a called number to mark it.

| Prize | Points |
|---|---|
| Early Five (any 5 numbers on one ticket) | +2 |
| Top Line / Middle Line / Bottom Line | +3 each |
| Full House (all 15 numbers, ends the game) | +5 |

Each prize is won once, by the first valid claim. Claims are checked by the host's phone against the numbers actually called, not against what the player marked. A false claim costs 1 point, and a claim for an already-won prize is ignored.
</details>

## 🛠️ Tech Stack

- **Frontend:** single-page app in plain HTML/CSS/JavaScript (`index.html`)
- **Backend:** Node.js server (`server.js`) that serves the app and syncs room state
- **Runtime:** Node.js 18+

## 🚀 Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)

### Run locally (for development and contributing)

Per the [license](LICENSE), you may run a local copy to work on contributions to this project.

```bash
git clone https://github.com/game-code-ship/GameParty.git
cd GameParty
npm install
npm start
```

Open the **"Same Wi-Fi"** address printed in the terminal on the **host device** (not `localhost`) so the QR code works for phones on the same network.

### Deploy

The server reads the `PORT` environment variable, so it runs on any Node host (Render, Railway, Fly.io, a VPS). Hosting your own public copy is **not permitted** under the [license](LICENSE) without written permission from the owner.

## 📁 Project Structure

```
GameParty/
├── index.html      # Entire client: UI, game logic, questions and word lists
├── server.js       # Node server and room state sync
├── package.json
└── README.md
```

Game content lives in lists inside `index.html`:

| Content | Location |
|---|---|
| Game list and min players | `GAMES` |
| "How to play" text | `HOW` (one entry per game id) |
| Fake Fact questions | `FACTS` (`Question with ___|Answer|alt;alt`) |
| Taboo cards | `TABOO` (`Word|ban|ban|ban|ban`) |
| Charades movies | `MOVIES` (`B|Title|Year|Actors|Unique style`) |
| Trivia questions | `QS` (`Question|Correct|Wrong|Wrong|Wrong`) |
| Would You Rather | `WYRS` (`Option A|Option B`) |
| Housie prizes and points | `HS_PR` |
| Name Place Animal Thing scoring | `NP_OK`, `NP_SP`, `NP_RV` |

## ➕ Adding a Game

1. Add an entry to `GAMES` and `DEF`.
2. Add a case in `startRound` / `ACT.start`.
3. Add a branch in `tick()` (the referee, which runs on the host device).
4. Add a view for the game.

## 🤝 Contributing

Everyone is welcome to **report issues, suggest games and submit pull requests**.

1. [Open an issue](https://github.com/game-code-ship/GameParty/issues) to report a bug or propose an idea
2. Fork the repository (allowed for contributing to this project)
3. Create a branch: `git checkout -b feature/your-feature`
4. Commit your changes: `git commit -m "Add your feature"`
5. Push the branch and open a Pull Request to this repository

By submitting a pull request, you agree that your contribution may be used, modified and distributed by the project owner as part of GameParty, and you confirm you have the right to submit it (see the [license](LICENSE)).

## 📄 License

GameParty is **source-available, not open source**, and is released under the **GameParty License** (see [LICENSE](LICENSE)).

**You may:**
- View the source code
- Fork the repository on GitHub to contribute to this project
- Report issues and submit pull requests

**Without prior written permission, you may not:**
- Use this code, in whole or in part, in any other project, product or service
- Copy, distribute, publish, sublicense or sell the code or any modified version
- Host, deploy or operate this software or a modified version as your own
- Remove or alter the license notice

Want to use GameParty beyond this? Open an issue to ask for permission.

## 🙌 Contributors

- [@sarhank8](https://github.com/sarhank8)
- [@game-code-ship](https://github.com/game-code-ship)
