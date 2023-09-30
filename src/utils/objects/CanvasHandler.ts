import { NODE_TYPE_MAP } from "../constants";
import { Algoritm, SelectedTool } from "../types";
import { Grid } from "./Grid";
import { GridNode } from "./GridNode";
import { GridNodeType } from "./GridNodeType";
import { Painter } from "./Painter";
import { Pathfinder } from "./Pathfinder";

export class CanvasHandler {
  private canvas: HTMLCanvasElement;
  private grid: Grid;
  private painter: Painter;
  private pathfinder: Pathfinder;
  private startNode: GridNode | null = null;
  private endNode: GridNode | null = null;

  private WIDTH: number;
  private HEIGHT: number;
  private NODE_SIZE: number;
  private GRID_WIDTH = 64;

  public isMouseDown = false;
  public selectedTool: SelectedTool = "none";
  public isRunning = false;

  public onChangeRunning: (running: boolean) => void = () => {};
  public onFinishRunning: (path: GridNode[]) => void = () => {};
  public onMissingNodes: () => void = () => {};

  constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.grid = new Grid();
    this.painter = new Painter(context);
    this.pathfinder = new Pathfinder(this.painter);

    this.WIDTH = canvas.width;
    this.HEIGHT = canvas.height;
    this.GRID_WIDTH = this.WIDTH / 32;
    this.NODE_SIZE = Math.floor(this.WIDTH / this.GRID_WIDTH);
  }

  init() {
    const rowsCount = Math.floor(this.HEIGHT / this.NODE_SIZE);
    this.grid.createGrid(this.GRID_WIDTH, rowsCount, this.NODE_SIZE);
    this.painter.drawGrid(this.grid);
  }

  onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    if (this.isMouseDown) {
      const { mouseX, mouseY } = this.getRelativeMousePosition(e);
      this.draw(mouseX, mouseY);
    }
  }

  onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    this.isMouseDown = true;
    const { mouseX, mouseY } = this.getRelativeMousePosition(e);
    this.draw(mouseX, mouseY);
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    this.isMouseDown = true;
    const { mouseX, mouseY } = this.getRelativeTouchPosition(e);
    this.draw(mouseX, mouseY);
  }

  onTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    if (this.isMouseDown) {
      const { mouseX, mouseY } = this.getRelativeTouchPosition(e);
      this.draw(mouseX, mouseY);
    }
  }

  onTouchEnd() {
    this.isMouseDown = false;
  }

  getRelativeTouchPosition(e: React.TouchEvent<HTMLCanvasElement>): {
    mouseX: number;
    mouseY: number;
  } {
    const touch = e.touches[0];
    if (touch) {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = touch.clientX - rect.left;
      const mouseY = touch.clientY - rect.top;

      return { mouseX, mouseY };
    }

    return { mouseX: 0, mouseY: 0 };
  }

  getRelativeMousePosition(e: React.MouseEvent<HTMLCanvasElement>): {
    mouseX: number;
    mouseY: number;
  } {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    return { mouseX, mouseY };
  }

  draw(mouseX: number, mouseY: number) {
    const selectedTool = this.selectedTool;

    if (this.isMouseDown && selectedTool !== "none" && !this.isRunning) {
      const grid = this.grid.getGrid();
      const xPos = ~~(mouseX / this.NODE_SIZE);
      const yPos = ~~(mouseY / this.NODE_SIZE);
      const targetTile = grid[yPos][xPos];
      const targetTileType = targetTile.type;

      if (NODE_TYPE_MAP[selectedTool] === targetTileType) {
        return;
      }

      if (
        (selectedTool === "start" || selectedTool === "end") &&
        targetTileType !== GridNodeType.EMPTY
      ) {
        return;
      }

      if (selectedTool === "start") {
        if (this.startNode) {
          this.startNode.type = GridNodeType.EMPTY;
          this.painter.drawGridNode(this.startNode);
        }
        this.startNode = targetTile;
      }

      if (selectedTool === "end") {
        if (this.endNode) {
          this.endNode.type = GridNodeType.EMPTY;
          this.painter.drawGridNode(this.endNode);
        }
        this.endNode = targetTile;
      }

      if (selectedTool === "eraser" || selectedTool === "barrier") {
        if (targetTileType === GridNodeType.STARTNODE) {
          this.startNode = null;
        }
        if (targetTileType === GridNodeType.ENDNODE) {
          this.endNode = null;
        }
      }

      targetTile.type = NODE_TYPE_MAP[selectedTool];
      this.painter.drawGridNode(targetTile);
    }
  }

  clearAll() {
    this.grid.flushGrid();
    this.painter.drawGrid(this.grid);

    this.startNode = null;
    this.endNode = null;
  }

  clearPathfindingVisuals() {
    this.painter.redrawGrid(this.grid);
  }

  runPathfinder(alghoritm: Algoritm) {
    if (this.startNode && this.endNode && !this.isRunning) {
      this.grid.resetValues();
      this.grid.updateNeighbours();
      this.isRunning = true;
      this.onChangeRunning(this.isRunning);
      this.pathfinder.run(
        alghoritm,
        this.startNode,
        this.endNode,
        (path: GridNode[]) => {
          this.isRunning = false;
          this.onChangeRunning(this.isRunning);
          this.onFinishRunning(path);
        }
      );
    }

    if (!this.startNode || !this.endNode) {
      this.onMissingNodes();
    }
  }
}
