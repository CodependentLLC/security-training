import React from "react";
import ScenarioPlayer from "./ScenarioPlayer";
import { scenarios } from "../data/scenarios";

interface Props {
  onBack: () => void;
}

const SoloScenario: React.FC<Props> = ({ onBack }) => {
  const scenario = scenarios.find(s => s.id === "ooda-loop-trainer");
  if (!scenario) return null;

  return <ScenarioPlayer scenario={scenario} onBack={onBack} />;
};

export default SoloScenario;
