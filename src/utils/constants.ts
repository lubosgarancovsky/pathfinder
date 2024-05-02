import { GridNodeType } from "./grid/GridNodeType";
import { SelectedTool } from "./types";

export const NODE_TYPE_MAP: Record<SelectedTool, GridNodeType> = {
  start: GridNodeType.STARTNODE,
  end: GridNodeType.ENDNODE,
  eraser: GridNodeType.EMPTY,
  barrier: GridNodeType.BARRIER,
  none: GridNodeType.EMPTY,
};

export const NODE_COLOR_MAP: Record<GridNodeType, string> = {
  [GridNodeType.STARTNODE]: "#5c72ff",
  [GridNodeType.ENDNODE]: "#ff5cc3",
  [GridNodeType.EMPTY]: "#171717",
  [GridNodeType.BARRIER]: "#383838",
};
