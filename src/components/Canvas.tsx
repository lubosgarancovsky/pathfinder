import { forwardRef } from "react";
import { CanvasHandler } from "../utils/canvas/CanvasHandler";

interface CanvasProps {
  handler: CanvasHandler | null;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ handler }, ref) => {
    return (
      <div className="flex-grow">
        <canvas
          ref={ref}
          className="w-full h-full"
          onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) =>
            handler?.onMouseMove?.(e)
          }
          onMouseDown={(e: React.MouseEvent<HTMLCanvasElement>) =>
            handler?.onMouseDown?.(e)
          }
          onTouchStart={(e: React.TouchEvent<HTMLCanvasElement>) =>
            handler?.onTouchStart?.(e)
          }
          onTouchMove={(e: React.TouchEvent<HTMLCanvasElement>) =>
            handler?.onTouchMove?.(e)
          }
          onTouchEnd={() => handler?.onTouchEnd?.()}
          onMouseUp={() => handler?.onMouseUp?.()}
        >
          Your browser does not support HTML5 canvas
        </canvas>
      </div>
    );
  }
);
