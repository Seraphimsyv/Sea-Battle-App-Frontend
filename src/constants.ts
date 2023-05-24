export const MAX_SHIP : number = 5;
export const CELL_SIZE : number = 35;

type CanvasData = {
  general: {
    lineColor: string,
    background: string,
    missed: string,
    destroyed: string
  }
}

export const CANVAS : CanvasData = {
  general: {
    lineColor: "rgb(55, 150, 250)",
    background: "linear-gradient(rgb(21 44 56) 0%, rgb(0, 119, 182) 100%)",
    missed: "rgb(102, 121, 140)",
    destroyed: "rgb(186, 34, 61)"
  }
}