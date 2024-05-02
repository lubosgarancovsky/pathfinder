import { NODE_COLOR_MAP } from "../constants";
import { Grid } from "../grid/Grid";
import { GridNode } from "../grid/GridNode";

export class Painter {
  private ctx: CanvasRenderingContext2D;

  private closedSet: string = "#1f3629";

  private openSetColor: string = "#2f9e61";

  private pathColor: string = "#e6e6e6";

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

  drawVisitedNode(node: GridNode) {
    this.drawCustomColorNode(node, this.closedSet);
  }

  drawOpenSetNode(node: GridNode) {
    this.drawCustomColorNode(node, this.openSetColor);
  }

  drawPathNode(node: GridNode) {
    this.drawCustomColorNode(node, this.pathColor);
  }

  private drawCustomColorNode(node: GridNode, color: string) {
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
