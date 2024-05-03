import { manhattan, wait } from "..";
import { GridNode } from "../grid/GridNode";
import { Painter } from "../canvas/Painter";

export class Astar {
  /**
   * Runs A* algorithm
   * @param {GridNode} startNode
   * @param {GridNode} endNode
   * @returns {GridNode[]} Array of nodes representing the closest path
   */
  static async run(
    painter: Painter,
    startNode: GridNode,
    endNode: GridNode
  ): Promise<GridNode[]> {
    const openSet: GridNode[] = [];
    const closedSet: GridNode[] = [];
    const path: GridNode[] = [];

    if (!startNode || !endNode) {
      return [];
    }

    openSet.push(startNode);

    while (openSet.length > 0) {
      await wait(5);

      let lowestIndex = 0;

      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      const current = openSet[lowestIndex];

      if (current === endNode) {
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

      if (current !== startNode && current !== endNode) {
        painter.drawVisitedNode(current);
      }

      const neighbours = current.neighbours;

      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i];

        if (!closedSet.includes(neighbour)) {
          const possibleG = current.g + 1;

          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);

            if (neighbour !== startNode && neighbour !== endNode) {
              painter.drawOpenSetNode(neighbour);
            }
          } else if (possibleG >= neighbour.g) {
            continue;
          }

          neighbour.g = possibleG;
          neighbour.h = manhattan(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
        }
      }
    }
    return [];
  }
}
