import { wait } from "..";
import { Painter } from "../canvas/Painter";
import { Grid } from "../grid/Grid";
import { GridNode } from "../grid/GridNode";

export class Djikstra {
  /**
   * Runs Djikstra algorithm
   * @param {GridNode} startNode
   * @param {GridNode} endNode
   * @param {Grid} grid
   * @returns {GridNode[]} Array of nodes representing the closest path
   */
  static async run(
    painter: Painter,
    startNode: GridNode,
    endNode: GridNode,
    grid: Grid
  ): Promise<GridNode[]> {
    const maze = grid.getGrid();

    const distances: number[][] = [];
    const previous: (GridNode | null)[][] = [];
    const visited = new Set();
    const nodes = maze.flat();

    const numRows = maze.length;
    const numCols = maze[0].length;

    for (let row = 0; row < numRows; row++) {
      const rowArr = [];
      const prevArr = [];
      for (let col = 0; col < numCols; col++) {
        rowArr.push(Infinity);
        prevArr.push(null);
      }
      distances.push(rowArr);
      previous.push(prevArr);
    }

    distances[startNode.posY][startNode.posX] = 0;

    while (nodes.length) {
      nodes.sort(
        (a, b) => distances[a.posY][a.posX] - distances[b.posY][b.posX]
      );
      let closestNode = nodes.shift() as GridNode;

      if (closestNode === endNode) {
        const path: GridNode[] = [];
        while (previous[closestNode.posY][closestNode.posX]) {
          path.push(closestNode);
          closestNode = previous[closestNode.posY][
            closestNode.posX
          ] as unknown as GridNode;
        }
        path.push(previous[closestNode.posY][closestNode.posX] as GridNode);
        return path.reverse();
      }

      if (distances[closestNode!.posY][closestNode!.posX] === Infinity)
        return [];

      visited.add(closestNode);
      await wait(5);

      if (closestNode !== startNode) {
        painter.drawVisitedNode(closestNode);
      }

      for (const neighbour of closestNode!.neighbours) {
        if (!visited.has(neighbour)) {
          if (neighbour !== startNode && neighbour !== endNode) {
            painter.drawOpenSetNode(neighbour);
          }

          const newDistance =
            distances[closestNode!.posY][closestNode!.posX] + 1;

          if (newDistance < distances[neighbour.posY][neighbour.posX]) {
            distances[neighbour.posY][neighbour.posX] = newDistance;
            previous[neighbour.posY][neighbour.posX] = closestNode;
          }
        }
      }
    }

    return [];
  }
}
