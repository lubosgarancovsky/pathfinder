import { GridNode } from "./GridNode";
import { GridNodeType } from "./GridNodeType";

export class Grid {
  private grid: GridNode[][];

  constructor() {
    this.grid = [];
  }

  getGrid() {
    return this.grid;
  }

  createGrid(xSize: number, ySize: number, nodeSize: number) {
    for (let y = 0; y < ySize; y++) {
      const rowArr: GridNode[] = [];
      for (let x = 0; x < xSize; x++) {
        rowArr.push(new GridNode(x, y, nodeSize));
      }
      this.grid.push(rowArr);
    }
  }

  flushGrid() {
    const ySize = this.grid.length;
    const xSize = this.grid[0]?.length || 0;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        this.grid[y][x].reset();
      }
    }
  }

  resetValues() {
    const ySize = this.grid.length;
    const xSize = this.grid[0]?.length || 0;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        this.grid[y][x].resetValues();
      }
    }
  }

  updateNeighbours() {
    const ySize = this.grid.length;
    const xSize = this.grid[0]?.length || 0;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        const current = this.grid[y][x];
        current.neighbours = [];

        if (current.type !== GridNodeType.BARRIER) {
          if (x < xSize - 1) {
            if (this.grid[y][x + 1].type !== GridNodeType.BARRIER) {
              current.neighbours.push(this.grid[y][x + 1]);
            }
          }

          if (x > 0) {
            if (this.grid[y][x - 1].type !== GridNodeType.BARRIER) {
              current.neighbours.push(this.grid[y][x - 1]);
            }
          }

          if (y < ySize - 1) {
            if (this.grid[y + 1][x].type !== GridNodeType.BARRIER) {
              current.neighbours.push(this.grid[y + 1][x]);
            }
          }

          if (y > 0) {
            if (this.grid[y - 1][x].type !== GridNodeType.BARRIER) {
              current.neighbours.push(this.grid[y - 1][x]);
            }
          }
        }
      }
    }
  }
}
