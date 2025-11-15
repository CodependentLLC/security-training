import React, { useEffect, useState } from "react";
import type { Scenario, ScenarioStep, ScenarioOption } from "../data/scenarios";
import { pushLog } from "../utils/logging";

interface Props {
  scenario: Scenario;
  onBack: () => void;
}

type StepState = {
  step: ScenarioStep;
  selected?: ScenarioOption;
  remaining: number | null;
};

const ScenarioPlayer: React.FC<Props> = ({ scenario, onBack }) => {
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState<StepState | null>(null);

  useEffect(() => {
    const step = scenario.steps[index];
    if (!step) return;
    setCurrent({
      step,
      selected: undefined,
      remaining: step.timeLimit ?? null
    });
  }, [scenario, index]);

  // simple countdown
  useEffect(() => {
    if (!current || current.remaining == null) return;
    if (current.remaining <= 0) return;

    const id = setTimeout(() => {
      setCurrent(prev =>
        prev
          ? {
              ...prev,
              remaining:
                prev.remaining && prev.remaining > 0
                  ? prev.remaining - 1
                  : prev.remaining
            }
          : prev
      );
    }, 1000);

    return () => clearTimeout(id);
  }, [current]);

  if (!current) return null;

  const { step, selected, remaining } = current;

  const handleOption = (opt: ScenarioOption) => {
    if (selected) return;

    setCurrent(prev =>
      prev
        ? {
            ...prev,
            selected: opt
          }
        : prev
    );

    pushLog({
      ts: Date.now(),
      type: "scenario_choice",
      payload: {
        scenarioId: scenario.id,
        stepId: step.id,
        option: opt
      }
    });
  };

  const next = () => {
    if (index + 1 < scenario.steps.length) {
      setIndex(index + 1);
    } else {
      onBack();
    }
  };

  const scoreSum = scenario.steps
    .slice(0, index + 1)
    .reduce((acc, s) => {
      if (s.id === step.id && selected) {
        return acc + selected.score;
      }
      return acc;
    }, 0);
  const maxScore = scenario.steps
    .slice(0, index + 1)
    .reduce(acc => acc + 100, 0);
  const percent = Math.round((scoreSum / maxScore) * 100);

  return (
    <div className="max-w-xl mx-auto bg-slate-900 text-slate-50 p-4 rounded-2xl border border-slate-700 shadow-lg">
      <button
        className="mb-2 text-xs text-slate-400 hover:text-slate-200"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-1">{scenario.title}</h2>
      <p className="text-xs text-slate-400 mb-3">{scenario.summary}</p>

      <div className="text-xs mb-2">
        Step {index + 1} of {scenario.steps.length} · Phase:{" "}
        <span className="font-semibold">{step.phase}</span>
      </div>

      {remaining != null && (
        <div className="mb-3 text-xs">
          Time remaining:{" "}
          <span className={remaining <= 5 ? "text-red-300" : "text-emerald-300"}>
            {remaining}s
          </span>
        </div>
      )}

      <p className="mb-4 text-sm">{step.prompt}</p>

      <div className="space-y-2 mb-4">
        {step.options.map(opt => {
          const isSelected = selected?.text === opt.text;
          return (
            <button
              key={opt.text}
              className={`w-full text-left text-sm border rounded-xl px-3 py-2 transition ${
                isSelected
                  ? "border-emerald-400 bg-emerald-500/10"
                  : "border-slate-700 hover:border-slate-500"
              }`}
              onClick={() => handleOption(opt)}
              disabled={!!selected}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mb-4 text-sm">
          <div className="font-semibold mb-1">Feedback</div>
          <p className="text-slate-200 mb-2">{selected.feedback}</p>
          <p className="text-xs text-slate-400">
            Step score: {selected.score}/100 · Overall: {percent}%
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-full bg-blue-500 text-sm hover:bg-blue-600 disabled:opacity-40"
          onClick={next}
          disabled={!selected}
        >
          {index + 1 < scenario.steps.length ? "Next step" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default ScenarioPlayer;
