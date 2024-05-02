import { Astar } from "./utils/algoritms/Astar";
import { Djikstra } from "./utils/algoritms/Djikstra";
import { Algoritm } from "./utils/types";
import { wait } from "./utils/wait";
import { Grid } from "./utils/grid/Grid";
import { GridNode } from "./utils/grid/GridNode";
import { Painter } from "./utils/canvas/Painter";

export class Pathfinder {
  private _painter: Painter;

  private astar: Astar;
  private djikstra: Djikstra;

  constructor(painter: Painter) {
    this._painter = painter;

    this.astar = new Astar(painter);
    this.djikstra = new Djikstra(painter);
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
        path = await this.astar.run(start, end);
        break;
      case "djikstra":
        path = await this.djikstra.run(start, end, grid);
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
