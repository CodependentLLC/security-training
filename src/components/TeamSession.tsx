import React, { useEffect, useRef, useState } from "react";
import { pushLog } from "../utils/logging";

const CHANNEL_NAME = "sectrain_team_session";

type Marker = { id: string; x: number; y: number };
type ChatMsg = { id: string; from: string; text: string; ts: number };

type Msg =
  | { type: "marker"; marker: Marker }
  | { type: "chat"; msg: ChatMsg };

interface Props {
  onBack: () => void;
}

const TeamSession: React.FC<Props> = ({ onBack }) => {
  const [role, setRole] = useState("Trainee");
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const chanRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const chan = new BroadcastChannel(CHANNEL_NAME);
    chanRef.current = chan;

    chan.onmessage = ev => {
      const data = ev.data as Msg;
      if (data.type === "marker") {
        setMarkers(prev => [...prev, data.marker]);
      } else if (data.type === "chat") {
        setChat(prev => [...prev, data.msg]);
      }
    };

    return () => {
      chan.close();
    };
  }, []);

  const sendMarker = (x: number, y: number) => {
    const marker: Marker = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y
    };
    setMarkers(prev => [...prev, marker]);
    chanRef.current?.postMessage({ type: "marker", marker } satisfies Msg);
    pushLog({
      ts: Date.now(),
      type: "marker",
      payload: { marker }
    });
  };

  const sendChat = () => {
    if (!input.trim()) return;
    const msg: ChatMsg = {
      id: `${Date.now()}-${Math.random()}`,
      from: role,
      text: input.trim(),
      ts: Date.now()
    };
    setChat(prev => [...prev, msg]);
    chanRef.current?.postMessage({ type: "chat", msg } satisfies Msg);
    pushLog({
      ts: Date.now(),
      type: "chat",
      payload: msg
    });
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto text-slate-50">
      <button
        className="mb-2 text-xs text-slate-400 hover:text-slate-200"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-2">Team Coordination Session</h2>
      <p className="text-xs text-slate-400 mb-3">
        Open this page in multiple tabs to simulate multiple team members.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Board */}
        <div className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Shared Board</span>
            <select
              className="bg-slate-800 text-xs rounded px-2 py-1"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option>Leader</option>
              <option>Instructor</option>
              <option>Trainee</option>
              <option>Comms</option>
            </select>
          </div>

          <div
            className="relative w-full h-64 bg-slate-800 rounded-xl overflow-hidden cursor-crosshair"
            onClick={e => {
              const rect = (e.target as HTMLDivElement).getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              sendMarker(x, y);
            }}
          >
            {markers.map(m => (
              <div
                key={m.id}
                className="absolute w-3 h-3 rounded-full bg-emerald-400 border border-emerald-200"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              />
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Click on the board to drop markers. All open tabs will see them.
          </p>
        </div>

        {/* Chat */}
        <div className="w-full md:w-72 bg-slate-900 border border-slate-700 rounded-2xl p-3 flex flex-col">
          <div className="text-sm font-semibold mb-2">Role Chat</div>
          <div className="flex-1 overflow-y-auto mb-2 text-xs space-y-1">
            {chat.map(c => (
              <div key={c.id}>
                <span className="font-semibold text-emerald-300">
                  [{c.from}]
                </span>{" "}
                <span>{c.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 text-xs bg-slate-800 rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Send a role-based message…"
            />
            <button
              className="text-xs px-3 py-1 rounded bg-blue-500 hover:bg-blue-600"
              onClick={sendChat}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSession;
