import { Algoritm } from "../types";
import { GridNode } from "./GridNode";
import { Painter } from "./Painter";

export class Pathfinder {
  private painter: Painter;

  constructor(painter: Painter) {
    this.painter = painter;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  heuristic(node1: GridNode, node2: GridNode) {
    const rowDistance = Math.abs(node1.posY - node2.posY);
    const colDistance = Math.abs(node1.posX - node2.posX);

    return rowDistance + colDistance;
  }

  async drawPath(path: GridNode[]) {
    const strippedPath = path.slice(1, -1);
    for (const tile of strippedPath) {
      this.painter.drawCustomColorNode(tile, "#e6e6e6");
      await this.delay(5);
    }
  }

  async run(
    alghoritm: Algoritm,
    start: GridNode,
    end: GridNode,
    onFinish: (path: GridNode[]) => void
  ) {
    let finalPath: GridNode[] = [];

    switch (alghoritm) {
      case "astar":
        finalPath = await this.astar(start, end);
        break;
      default:
        onFinish(finalPath);
        return;
    }

    if (finalPath.length) {
      this.drawPath(finalPath);
    }

    onFinish(finalPath);
  }

  async astar(start: GridNode, end: GridNode): Promise<GridNode[]> {
    const openSet: GridNode[] = [];
    const closedSet: GridNode[] = [];
    const path: GridNode[] = [];

    if (!start || !end) {
      return [];
    }

    openSet.push(start);

    while (openSet.length > 0) {
      await this.delay(5);

      let lowestIndex = 0;

      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      const current = openSet[lowestIndex];

      if (current === end) {
        let temp = current;
        path.push(temp);

        while (temp.parent) {
          temp = temp.parent;
          path.push(temp);
        }

        const finalPath = path.reverse();
        return finalPath;
      }

      openSet.splice(lowestIndex, 1);

      closedSet.push(current);
      if (current !== start && current !== end) {
        this.painter.drawCustomColorNode(current, "#1f3629");
      }

      const neighbours = current.neighbours;

      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i];

        if (!closedSet.includes(neighbour)) {
          const possibleG = current.g + 1;

          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);
            if (neighbour !== start && neighbour !== end) {
              this.painter.drawCustomColorNode(neighbour, "#2f9e61");
            }
          } else if (possibleG >= neighbour.g) {
            continue;
          }

          neighbour.g = possibleG;
          neighbour.h = this.heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
        }
      }
    }
    return [];
  }
}
