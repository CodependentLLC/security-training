import React, { useState } from "react";
import { scenarios, Scenario } from "../data/scenarios";
import ScenarioPlayer from "./ScenarioPlayer";

interface Props {
  onBack: () => void;
}

const ScenarioLibrary: React.FC<Props> = ({ onBack }) => {
  const [active, setActive] = useState<Scenario | null>(null);

  if (active) {
    return (
      <ScenarioPlayer
        scenario={active}
        onBack={() => {
          setActive(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-slate-50">
      <button
        className="mb-2 text-xs text-slate-400 hover:text-slate-200"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-2">Scenario Library</h2>
      <p className="text-xs text-slate-400 mb-4">
        Explore decision-making scenarios, including an OODA Loop trainer.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {scenarios.map(s => (
          <button
            key={s.id}
            className="text-left bg-slate-900 border border-slate-700 rounded-2xl p-3 hover:border-slate-500 transition"
            onClick={() => setActive(s)}
          >
            <div className="text-sm font-semibold mb-1">{s.title}</div>
            <div className="text-[11px] text-slate-400 mb-2">
              {s.summary}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{s.difficulty}</span>
              <span>{s.tags.join(" · ")}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioLibrary;
