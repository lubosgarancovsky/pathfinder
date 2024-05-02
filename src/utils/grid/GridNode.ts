import { NODE_TYPE_MAP } from "../constants";
import { SelectedTool } from "../types";
import { GridNodeType } from "./GridNodeType";

export class GridNode {
  public posX: number;
  public posY: number;
  public size: number;
  public type: GridNodeType;
  public neighbours: GridNode[];
  public parent: GridNode | null = null;
  public f = 0;
  public g = 0;
  public h = 0;

  constructor(posX: number, posY: number, size: number) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.type = GridNodeType.EMPTY;
    this.neighbours = [];
  }

  setTypeByTool(selectedTool: SelectedTool) {
    if (selectedTool !== "none") {
      this.type = NODE_TYPE_MAP[selectedTool];
    }
  }

  resetValues() {
    this.neighbours = [];
    this.parent = null;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }

  reset() {
    this.type = GridNodeType.EMPTY;
    this.resetValues();
  }
}
