import { useEffect, useRef, useState } from "react";
import { Canvas, Header } from "./components";
import { Algoritm, SelectedTool } from "./utils/types";
import { CanvasHandler } from "./utils/objects/CanvasHandler";
import { Modal } from "./components/Modal";
import { GridNode } from "./utils/objects/GridNode";
import { Snackbar, SnackbarVariant } from "./components/Snackbar";

const App = () => {
  const [handler, setHandler] = useState<CanvasHandler | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinishedRunning, setHasFinishedRunning] = useState(false);
  const [infoModalOpened, setInfoModalOpened] = useState(true);
  const [snackbar, setSnackbar] = useState({
    opened: true,
    pathLenth: 0,
    variant: "success",
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      if (context) {
        const canvasHandler = new CanvasHandler(context, canvas);
        canvasHandler.onChangeRunning = (running: boolean) =>
          setIsRunning(running);
        canvasHandler.onFinishRunning = (path: GridNode[]) => {
          setHasFinishedRunning(true);
          setSnackbar({
            opened: true,
            pathLenth: path.length,
            variant: path.length ? "success" : "warning",
          });
        };
        canvasHandler.onMissingNodes = () => setInfoModalOpened(true);
        canvasHandler.init();
        setHandler(canvasHandler);
      }
    }
  }, []);

  return (
    <div className="bg-neutral-900 w-screen h-screen text-neutral-200 flex flex-col overflow-hidden relative">
      <Modal opened={infoModalOpened} toggleOpen={setInfoModalOpened} />
      <Snackbar
        opened={snackbar.opened}
        variant={snackbar.variant as SnackbarVariant}
        onClose={() => setSnackbar((p) => ({ ...p, opened: false }))}
        title={
          snackbar.variant === "success"
            ? `Shortest path is ${snackbar.pathLenth} tiles long`
            : "Path was not found"
        }
      />

      <Header
        onSelectedToolChange={(tool: SelectedTool) => {
          if (handler) {
            handler.selectedTool = tool;
          }
        }}
        onClearAll={() => {
          handler?.clearAll();
          setHasFinishedRunning(false);
        }}
        onStart={(alg: Algoritm) => handler?.runPathfinder(alg)}
        onClearVisuals={() => {
          handler?.clearPathfindingVisuals();
          setHasFinishedRunning(false);
        }}
        isReadyToStart={!isRunning && !hasFinishedRunning}
        isFinished={hasFinishedRunning}
      />
      <Canvas ref={canvasRef} handler={handler} />
    </div>
  );
};

export default App;
