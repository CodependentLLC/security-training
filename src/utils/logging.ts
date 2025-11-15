const LOGKEY = "sectrain_logs";

export type LogEvent = {
  ts: number;
  type: "scenario_choice" | "marker" | "chat" | "status";
  payload: any;
};

export function readLog(): LogEvent[] {
  try {
    const d = JSON.parse(localStorage.getItem(LOGKEY) || "[]");
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}

export function pushLog(ev: LogEvent) {
  try {
    const old = readLog();
    localStorage.setItem(LOGKEY, JSON.stringify([...old, ev]));
  } catch {
    // ignore
  }
}

export function clearLog() {
  try {
    localStorage.removeItem(LOGKEY);
  } catch {
    // ignore
  }
}
