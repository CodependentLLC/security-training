import React from "react";
import { Shield, Users, Brain, PlayCircle } from "lucide-react";
import SoloScenario from "./components/SoloScenario";
import TeamSession from "./components/TeamSession";
import AfterActionReview from "./components/AfterActionReview";
import ScenarioLibrary from "./components/ScenarioLibrary";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";


type Mode = "menu" | "solo" | "team" | "review" | "scenario";

const App: React.FC = () => {
  const [mode, setMode] = React.useState<Mode>("menu");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Security Training Simulator
        </h1>
        <p className="text-xs text-slate-400 text-center mb-6">
          Solo & team decision-making trainer · OODA Loop · After Action Review
        </p>

        {mode === "menu" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Solo */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col items-center">
              <Shield className="w-10 h-10 mb-3 text-blue-400" />
              <h2 className="text-lg font-semibold mb-1">Solo Training</h2>
              <p className="text-xs text-slate-300 text-center mb-3">
                Practice judgment and situational awareness in safe,
                scenario-based sessions.
              </p>
              <button
                className="px-4 py-2 text-sm rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={() => setMode("solo")}
              >
                Start Solo
              </button>
            </div>

            {/* Team */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col items-center">
              <Users className="w-10 h-10 mb-3 text-green-400" />
              <h2 className="text-lg font-semibold mb-1">Team Coordination</h2>
              <p className="text-xs text-slate-300 text-center mb-3">
                Simulate team communication using shared board and role-based
                chat (multi-tab).
              </p>
              <button
                className="px-4 py-2 text-sm rounded-full bg-green-500 hover:bg-green-600"
                onClick={() => setMode("team")}
              >
                Join Team Session
              </button>
            </div>

            {/* Library */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col items-center">
              <Brain className="w-10 h-10 mb-3 text-purple-400" />
              <h2 className="text-lg font-semibold mb-1">Scenario Library</h2>
              <p className="text-xs text-slate-300 text-center mb-3">
                Browse and run decision scenarios including OODA-focused
                training.
              </p>
              <button
                className="px-4 py-2 text-sm rounded-full bg-purple-500 hover:bg-purple-600"
                onClick={() => setMode("scenario")}
              >
                Open Library
              </button>
            </div>

            {/* AAR */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col items-center">
              <PlayCircle className="w-10 h-10 mb-3 text-yellow-400" />
              <h2 className="text-lg font-semibold mb-1">
                After Action Review
              </h2>
              <p className="text-xs text-slate-300 text-center mb-3">
                Review logs of choices, markers, and chat from recent sessions.
              </p>
              <button
                className="px-4 py-2 text-sm rounded-full bg-yellow-500 hover:bg-yellow-600 text-slate-900"
                onClick={() => setMode("review")}
              >
                Open AAR
              </button>
            </div>
          </div>
        )}

        {mode === "solo" && <SoloScenario onBack={() => setMode("menu")} />}
        {mode === "team" && <TeamSession onBack={() => setMode("menu")} />}
        {mode === "review" && <AfterActionReview onBack={() => setMode("menu")} />}
        {mode === "scenario" && <ScenarioLibrary onBack={() => setMode("menu")} />}

        <p className="mt-6 text-[10px] text-slate-500 text-center">
          This simulator focuses on decision-making, communication, and
          judgment. It does not replace certified in-person firearms or
          self-defense training. Always follow local laws and work with qualified
          instructors.
        </p>
      </div>
    </div>
  );
};

export default App;
