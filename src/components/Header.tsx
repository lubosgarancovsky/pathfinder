import { useState } from "react";
import { IconButton } from ".";
import BarrierIcon from "./icons/BarrierIcon";
import EraserIcon from "./icons/EraserIcon";
import { Algoritm, SelectedTool } from "../utils/types";
import StartArrowIcon from "./icons/StartArrowIcon";
import EndArrowIcon from "./icons/EndArrowIcon";
import ClearIcon from "./icons/ClearIcon";
import PlayIcon from "./icons/PlayIcon";
import RepeatIcon from "./icons/RepeatIcon";

interface HeaderProps {
  onSelectedToolChange: (selectedTool: SelectedTool) => void;
  onClearAll: () => void;
  onStart: (alghoritm: Algoritm) => void;
  onClearVisuals: () => void;
  isReadyToStart: boolean;
  isFinished: boolean;
  version: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectedToolChange,
  onClearAll,
  onStart,
  onClearVisuals,
  isReadyToStart,
  isFinished,
  version,
}) => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>("none");
  const [selectedAlg, setSelectedAlg] = useState<Algoritm>("astar");

  const handleActiveToolChange = (active: boolean, tool: SelectedTool) => {
    const newSelectedTool = active ? tool : "none";
    setSelectedTool(newSelectedTool);
    onSelectedToolChange(newSelectedTool);
  };

  return (
    <header className="w-full p-2 bg-neutral-950 flex gap-2 flex-col-reverse sm:flex-row justify-between">
      <ul className="flex gap-4 justify-between items-center">
        <li>
          <IconButton
            icon={<StartArrowIcon />}
            tooltip="Starting point"
            active={selectedTool === "start"}
            onClick={(active: boolean) =>
              handleActiveToolChange(active, "start")
            }
          />
        </li>
        <li>
          <IconButton
            icon={<EndArrowIcon />}
            tooltip="Ending point"
            active={selectedTool === "end"}
            onClick={(active: boolean) => handleActiveToolChange(active, "end")}
          />
        </li>
        <li>
          <IconButton
            icon={<BarrierIcon />}
            tooltip="Barrier"
            active={selectedTool === "barrier"}
            onClick={(active: boolean) =>
              handleActiveToolChange(active, "barrier")
            }
          />
        </li>
        <li>
          <IconButton
            icon={<EraserIcon />}
            tooltip="Eraser"
            active={selectedTool === "eraser"}
            onClick={(active: boolean) =>
              handleActiveToolChange(active, "eraser")
            }
          />
        </li>
        <li>
          <IconButton
            icon={<ClearIcon />}
            tooltip="Clear"
            active={false}
            disableActiveState={true}
            variant="warning"
            onClick={onClearAll}
          />
        </li>
        <p className="text-xs text-neutral-600">Version: {version}</p>
      </ul>

      <div className="flex gap-4 items-center justify-between">
        <span>Algoritm:</span>
        <select
          className="bg-neutral-800 p-2 rounded-md min-w-[12rem]"
          onChange={(e) => setSelectedAlg(e.target.value as Algoritm)}
          value={selectedAlg}
        >
          <option value="astar">A* (A star)</option>
          <option value="djikstra">Djikstra</option>
        </select>
        {isFinished && (
          <IconButton
            icon={<RepeatIcon />}
            tooltip="New scenario"
            active={false}
            disableActiveState={true}
            variant="default"
            onClick={() => onClearVisuals()}
            flipTooltip
          />
        )}
        {!isFinished && (
          <IconButton
            icon={<PlayIcon />}
            tooltip="Run"
            active={false}
            disableActiveState={true}
            disabled={!isReadyToStart}
            variant="success"
            onClick={() => onStart(selectedAlg)}
            flipTooltip
          />
        )}
      </div>
    </header>
  );
};
