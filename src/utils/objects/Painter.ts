import { NODE_COLOR_MAP } from "../constants";
import { Grid } from "./Grid";
import { GridNode } from "./GridNode";

export class Painter {
  private ctx: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  drawGridNode(node: GridNode) {
    const nodeSize = node.size;
    const absoluteXPos = node.posX * nodeSize;
    const absoluteYPos = node.posY * nodeSize;

    this.ctx.fillStyle = NODE_COLOR_MAP[node.type];
    this.ctx.fillRect(absoluteXPos, absoluteYPos, nodeSize, nodeSize);
    this.ctx.strokeRect(absoluteXPos, absoluteYPos, nodeSize, nodeSize);
  }

  drawGrid(gridObject: Grid) {
    const grid = gridObject.getGrid();
    const ySize = grid.length;
    const xSize = grid[0]?.length || 0;

    this.ctx.strokeStyle = "#403f40";
    this.ctx.lineWidth = 0.5;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        this.drawGridNode(grid[y][x]);
      }
    }
  }

  redrawGrid(gridObject: Grid) {
    this.drawGrid(gridObject);

    const grid = gridObject.getGrid();
    const ySize = grid.length;
    const xSize = grid[0]?.length || 0;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        this.drawGridNode(grid[y][x]);
      }
    }
  }

  drawCustomColorNode(node: GridNode, color: string) {
    this.ctx.fillStyle = color;
    const nodeSize = node.size;
    const absoluteXPos = node.posX * nodeSize;
    const absoluteYPos = node.posY * nodeSize;
    const space = ~~((nodeSize / 100) * 20);
    this.ctx.fillRect(
      absoluteXPos + space,
      absoluteYPos + space,
      nodeSize - space * 2,
      nodeSize - space * 2
    );
  }
}
