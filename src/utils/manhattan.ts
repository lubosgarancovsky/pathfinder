import { GridNode } from "./grid/GridNode";

/**
 * Manhattan distance between two nodes
 * @param {GridNode} node1
 * @param {GridNode} node2
 * @returns {number} Manhattan distance between two nodes
 */
export const manhattan = (node1: GridNode, node2: GridNode): number => {
  return Math.abs(node1.posY - node2.posY) + Math.abs(node1.posX - node2.posX);
};
