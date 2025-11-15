import React from "react";
import { clearLog, readLog } from "../utils/logging";

interface Props {
  onBack: () => void;
}

const AfterActionReview: React.FC<Props> = ({ onBack }) => {
  const [events, setEvents] = React.useState(readLog());

  const handleClear = () => {
    clearLog();
    setEvents([]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 text-slate-50 p-4 rounded-2xl border border-slate-700 shadow-lg">
      <button
        className="mb-2 text-xs text-slate-400 hover:text-slate-200"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-2">After Action Review</h2>
      <p className="text-xs text-slate-400 mb-4">
        Timeline of scenario choices, markers, and chat events from this browser.
      </p>

      <div className="max-h-80 overflow-y-auto text-xs space-y-2">
        {events.length === 0 && (
          <p className="text-slate-500">No events recorded yet.</p>
        )}
        {events.map((ev, idx) => (
          <div key={idx} className="border-b border-slate-800 pb-2">
            <div className="text-[10px] text-slate-400">
              {new Date(ev.ts).toLocaleString()} · {ev.type}
            </div>
            <pre className="whitespace-pre-wrap break-all mt-1 text-[11px]">
              {JSON.stringify(ev.payload, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-3 py-1 text-xs rounded-full border border-slate-600 hover:border-slate-400"
          onClick={handleClear}
        >
          Clear log
        </button>
      </div>
    </div>
  );
};

export default AfterActionReview;
