# 🛡️ Security Training Simulator (PWA)
> Progressive Web App for Solo & Team Decision-Making, OODA Training, and AAR

![Build](https://img.shields.io/github/actions/workflow/status/yourname/security-training-simulator/ci.yml?branch=main)
![License](https://img.shields.io/github/license/yourname/security-training-simulator)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-339933)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 🎨 Project Banner

> **Replace this with a real image once you have it.**

![Security Training Simulator Banner](docs/banner.png)

Suggested banner content:
- Left: Title “Security Training Simulator”
- Middle: Small OODA loop graphic (Observe → Orient → Decide → Act)
- Right: Mock UI of Solo, Team, and AAR cards

---

## 📸 Screenshots

> Place your screenshots in `docs/` and update the paths below.

### Solo Scenario – OODA Loop Trainer

[Solo Scenario – OODA Loop Trainer](docs/solo-ooda.png)

- Timed decision steps
- OODA-focused questions
- Feedback per choice

---

### Team Coordination – Shared Board & Comms

[Team Coordination – Shared Board & Comms](docs/team-session.png)

- Shared marker board using `BroadcastChannel`
- Role-based text chat
- Multi-tab “fake” multi-user simulation

---

### After Action Review (AAR)

![After Action Review](docs/aar-view.png)

- Timeline of events
- Markers, chat, and statuses
- Clear logs between sessions

---

## 🚀 Features

### 🧠 Solo Scenario Trainer

- Scenario-based decision-making (no technique instruction)
- Timed steps with visual countdown
- Instant feedback and scoring
- Includes **OODA Loop Decision Trainer** scenario set

### 👥 Team Coordination Mode

- Uses browser **BroadcastChannel API** (no backend required)
- Shared mapboard: click to drop markers
- Role-based text comms (Leader, Instructor, Trainee, Comms)
- Run with 2+ tabs to simulate a team

### 📊 After Action Review (AAR)

- Logs:
  - Chat events
  - Marker placements
  - Status changes (drills, readiness)
- Stored in `localStorage`
- Simple replay-friendly timeline

### 🧱 Stack

- **React + Vite**
- **TypeScript-ready friendly structure** (even if current file is JS)
- **Framer Motion** for smooth UI animations
- **Lucide React** for icons
- **Tailwind CSS** for styling
- **BroadcastChannel API** + **localStorage**

---

## 📦 Installation (Single-File Version)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourname/security-training-simulator.git
cd security-training-simulator
```

## 2️⃣ Install Dependencies

```
npm install
```

## 3️⃣ Install Required Libraries

```
npm install framer-motion lucide-react
```

Tailwind setup is recommended but not strictly required; the app will still function with plain CSS, just uglier.

## 4️⃣ Run the Dev Server

```
npm run dev
```
Open:
👉 http://localhost:5173

🧩 Modular File Separation (From Single-File to Multi-File)

Right now, the app can live entirely in src/App.tsx.
If you want a more professional structure, here’s a clean way to split it up.

1️⃣ Target Structure

```
src/
  App.tsx
  main.tsx
  index.css

  components/
    SoloScenario.tsx
    TeamSession.tsx
    AfterActionReview.tsx
    ScenarioPlayer.tsx
    ScenarioLibrary.tsx

  data/
    scenarios.ts

  utils/
    logging.ts
```

2️⃣ Move Logging Functions → utils/logging.ts

From your current App.tsx, cut:

```
const LOGKEY = "sectrain_logs";
export function readLog() { ... }
export function pushLog(ev) { ... }
export function clearLog() { ... }
```

Paste into src/utils/logging.ts:

```
const LOGKEY = "sectrain_logs";

export function readLog() {
  try {
    const d = JSON.parse(localStorage.getItem(LOGKEY) || "[]");
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}

export function pushLog(ev: any) {
  try {
    const old = readLog();
    localStorage.setItem(LOGKEY, JSON.stringify([...old, ev]));
  } catch {}
}

export function clearLog() {
  try {
    localStorage.removeItem(LOGKEY);
  } catch {}
}
```
Then in files that need it (TeamSession, AAR):

```
import { readLog, pushLog, clearLog } from "@/utils/logging";

```

(or relative path: "../utils/logging" if you don’t use @ alias).

3️⃣ Move Scenario Data → data/scenarios.ts

Create src/data/scenarios.ts:

```
export type ScenarioOption = {
  text: string;
  score: number;
  feedback: string;
};

export type ScenarioStep = {
  id: string;
  prompt: string;
  timeLimit?: number;
  options: ScenarioOption[];
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  steps: ScenarioStep[];
};

export const scenarios: Scenario[] = [
  {
    id: "ooda-loop-trainer",
    title: "OODA Loop Decision Trainer",
    summary: "Learn what the OODA loop means, then apply Observe, Orient, Decide, and Act.",
    tags: ["OODA", "decision-making", "cognitive"],
    difficulty: "Beginner",
    steps: [
      // ... your OODA steps ...
    ],
  },
  // ... other scenarios ...
];

```

Then in ScenarioLibrary.tsx:

```
import { scenarios, type Scenario } from "@/data/scenarios";
```

4️⃣ Extract UI Components
components/ScenarioPlayer.tsx

```
import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./ui"; // or your actual imports
import type { Scenario } from "@/data/scenarios";

type Props = { scenario: Scenario; onBack: () => void };

// paste your ScenarioPlayer implementation here and export default
export default function ScenarioPlayer({ scenario, onBack }: Props) { ... }

```

components/SoloScenario.tsx

Use a single Scenario (e.g. the After-Hours facility) directly, or re-use the scenarios data.

import React from "react";
import ScenarioPlayer from "./ScenarioPlayer";
import { scenarios } from "@/data/scenarios";

export default function SoloScenario({ onBack }: { onBack: () => void }) {
  const scenario = scenarios.find(s => s.id === "after-hours-check")!;
  return <ScenarioPlayer scenario={scenario} onBack={onBack} />;
}

components/TeamSession.tsx

Move the BroadcastChannel logic into components/TeamSession.tsx and export it as default.

components/AfterActionReview.tsx

Move AAR code, import readLog/clearLog from utils/logging.

components/ScenarioLibrary.tsx

Move your card grid + filters + modal + ScenarioPlayer usage here.

5️⃣ Clean App.tsx Down to a Simple Router

After extracting, your App.tsx becomes tiny and clean:

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Brain, PlayCircle } from "lucide-react";
import SoloScenario from "./components/SoloScenario";
import TeamSession from "./components/TeamSession";
import AfterActionReview from "./components/AfterActionReview";
import ScenarioLibrary from "./components/ScenarioLibrary";
import { Card, CardContent, Button } from "./components/ui"; // or your UI lib

export default function App() {
  const [mode, setMode] = React.useState<"menu" | "solo" | "team" | "review" | "scenario">("menu");

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Security Training Simulator
      </motion.h1>

      {mode === "menu" && (
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
          {/* Solo */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="flex flex-col items-center p-6">
              <Shield className="w-12 h-12 mb-4 text-blue-400" />
              <h2 className="text-xl font-semibold mb-2">Solo Training</h2>
              <p className="text-slate-200 text-center mb-4">
                Practice judgment and situational awareness in safe simulated environments.
              </p>
              <Button onClick={() => setMode("solo")}>Start Solo</Button>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="flex flex-col items-center p-6">
              <Users className="w-12 h-12 mb-4 text-green-400" />
              <h2 className="text-xl font-semibold mb-2">Team Coordination</h2>
              <p className="text-slate-200 text-center mb-4">
                Train communication, timing, and coordination with team roles.
              </p>
              <Button onClick={() => setMode("team")}>Join Team</Button>
            </CardContent>
          </Card>

          {/* Library */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="flex flex-col items-center p-6">
              <Brain className="w-12 h-12 mb-4 text-purple-400" />
              <h2 className="text-xl font-semibold mb-2">Scenario Library</h2>
              <p className="text-slate-200 text-center mb-4">
                Explore decision scenarios including an OODA Loop trainer.
              </p>
              <Button onClick={() => setMode("scenario")}>Open Library</Button>
            </CardContent>
          </Card>

          {/* AAR */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="flex flex-col items-center p-6">
              <PlayCircle className="w-12 h-12 mb-4 text-yellow-400" />
              <h2 className="text-xl font-semibold mb-2">After Action Review</h2>
              <p className="text-slate-200 text-center mb-4">
                Review logs, markers, and communications from past sessions.
              </p>
              <Button onClick={() => setMode("review")}>Open AAR</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {mode === "solo" && <SoloScenario onBack={() => setMode("menu")} />}
      {mode === "team" && <TeamSession onBack={() => setMode("menu")} />}
      {mode === "review" && <AfterActionReview onBack={() => setMode("menu")} />}
      {mode === "scenario" && <ScenarioLibrary onBack={() => setMode("menu")} />}
    </div>
  );
}


⚠️ Disclaimer

This application is for decision-making and communication training only.
It does not replace certified in-person firearms, Krav Maga, self-defense, or tactical instruction.
Always train safely, follow local laws, and work with qualified instructors.

🤝 Contributing

Fork the repo

Create a feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -m "Add my feature"

Push: git push origin feature/my-feature

Open a PR 🚀

📄 License

MIT — see LICENSE for details.


---

If you want, next I can:

- Draft an initial **CHANGELOG.md**
- Write a **CONTRIBUTING.md** guideline for external collaborators
- Suggest **GitHub Actions** config for CI (type check + build).


