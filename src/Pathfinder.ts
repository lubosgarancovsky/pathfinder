import { Astar } from "./utils/algoritms/Astar";
import { Djikstra } from "./utils/algoritms/Djikstra";
import { Algoritm } from "./utils/types";
import { wait } from "./utils/wait";
import { Grid } from "./utils/grid/Grid";
import { GridNode } from "./utils/grid/GridNode";
import { Painter } from "./utils/canvas/Painter";

export class Pathfinder {
  private _painter: Painter;

  constructor(painter: Painter) {
    this._painter = painter;
  }

  async visualisePath(path: GridNode[]) {
    const strippedPath = path.slice(1, -1);
    for (const tile of strippedPath) {
      this._painter.drawPathNode(tile);
      await wait(5);
    }
  }

  async run(
    alghoritm: Algoritm,
    start: GridNode,
    end: GridNode,
    grid: Grid,
    onFinish: (path: GridNode[]) => void
  ) {
    let path: GridNode[] = [];

    switch (alghoritm) {
      case "astar":
        path = await Astar.run(this._painter, start, end);
        break;
      case "djikstra":
        path = await Djikstra.run(this._painter, start, end, grid);
        break;
      default:
        onFinish(path);
        return;
    }

    if (path.length) {
      this.visualisePath(path);
    }

    onFinish(path);
  }
}
