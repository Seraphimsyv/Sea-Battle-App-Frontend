import {
  Point,
  GameStatus,
  PointsList,
  OpponentStatus
} from '../types'

export type PlayerBoardProps = {
  gameStatus?: GameStatus,
  playerPlaygroundPoints?: PointsList,
  callbackUploadShips: (point: Point) => void
};

export type PlayerGridProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  shipList?: Point[],
  missedList?: Point[],
  destroyedList?: Point[],
  callbackDragEnter: (event: React.DragEvent<HTMLCanvasElement>) => void,
  callbackDragOver: (event: React.DragEvent<HTMLCanvasElement>) => void,
  callbackDragLeave: (event: React.DragEvent<HTMLCanvasElement>) => void,
  callbackDrop: (event: React.DragEvent<HTMLCanvasElement>) => void
};

export type OpponentBoardProps = {
  gameStatus?: GameStatus,
  opponentStatus?: OpponentStatus,
  missedList?: Point[],
  destroyedList?: Point[],
  callbackCheckShot: (point: Point) => void
};

export type OpponentGridProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gameStatus?: GameStatus,
  missedList?: Point[],
  destroyedList?: Point[],
  callbackCheckShot: (point: Point) => void
};