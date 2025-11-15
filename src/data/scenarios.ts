export type ScenarioOption = {
  text: string;
  score: number; // 0–100 (relative usefulness)
  feedback: string;
};

export type ScenarioStep = {
  id: string;
  phase: "Observe" | "Orient" | "Decide" | "Act";
  prompt: string;
  timeLimit?: number; // seconds
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
    summary:
      "Walk through Observe, Orient, Decide, and Act in a developing security situation.",
    tags: ["OODA", "decision-making", "cognitive"],
    difficulty: "Beginner",
    steps: [
      {
        id: "observe",
        phase: "Observe",
        prompt:
          "You’re monitoring an entry area. You notice raised voices and a small crowd forming near a side door. What do you focus on first?",
        timeLimit: 20,
        options: [
          {
            text: "Who is involved, where they are, and potential escape routes.",
            score: 100,
            feedback:
              "Good observation: people, positions, and exits help you understand risk."
          },
          {
            text: "Only the loudest person and ignore surroundings.",
            score: 40,
            feedback:
              "You picked up on one element, but missed context and environment."
          },
          {
            text: "Nothing yet; you assume it’s normal chatter.",
            score: 10,
            feedback:
              "That risks missing early indicators and losing initiative."
          }
        ]
      },
      {
        id: "orient",
        phase: "Orient",
        prompt:
          "You see one agitated person and others backing away. No obvious weapons. What’s your initial orientation?",
        timeLimit: 20,
        options: [
          {
            text: "Treat it as a potential risk, but prioritize distance and de-escalation.",
            score: 100,
            feedback:
              "Balanced orientation: possible risk, but not automatically a lethal threat."
          },
          {
            text: "Assume the person is harmless until proven otherwise.",
            score: 40,
            feedback:
              "You’re under-weighting risk; better to respect early warning signs."
          },
          {
            text: "Assume the worst and prepare for maximum force immediately.",
            score: 20,
            feedback:
              "This over-escalates before you have enough information."
          }
        ]
      },
      {
        id: "decide",
        phase: "Decide",
        prompt:
          "You can safely keep some distance, have radio contact available, and there are bystanders around. What’s your decision?",
        timeLimit: 20,
        options: [
          {
            text: "Create space, notify your team/dispatch, and begin calm verbal engagement.",
            score: 100,
            feedback:
              "Strong choice: communication + backup + distance keeps options open."
          },
          {
            text: "Move in very close and confront the person loudly.",
            score: 30,
            feedback:
              "Closes distance and may escalate tension unnecessarily."
          },
          {
            text: "Ignore situation and stay at your original post.",
            score: 10,
            feedback:
              "Avoids immediate conflict, but leaves potential risk unmanaged."
          }
        ]
      },
      {
        id: "act",
        phase: "Act",
        prompt:
          "The person calms slightly when you speak but still seems tense. Bystanders are watching. What action do you take?",
        timeLimit: 20,
        options: [
          {
            text: "Maintain distance, keep a clear path to leave, and continue calm but firm communication.",
            score: 100,
            feedback:
              "You are managing risk, protecting bystanders, and preserving options."
          },
          {
            text: "Abruptly end contact and walk away without notifying anyone.",
            score: 40,
            feedback:
              "This may leave others exposed to risk you detected."
          },
          {
            text: "Immediately escalate to physical control without further attempt to de-escalate.",
            score: 20,
            feedback:
              "This skips remaining non-physical options and increases liability."
          }
        ]
      }
    ]
  }
];
