import {
  EnumGameStatus,
  EnumOpponentStatus
} from '../enum'

export type Point = { x: number, y: number };

export type PointsList = {
  shipsList: Point[];
  missedList: Point[];
  destroyedList: Point[];
};

export type PlayersPointList = {
  player: PointsList,
  opponent: PointsList,
};

export type GameStatus = {
  status: EnumGameStatus,
  turn?: number,
  step?: number,
  winner?: string
};

export type OpponentStatus = {
  status: EnumOpponentStatus,
  username?: string,
};

export type Message = {
  username: string,
  message: string
}