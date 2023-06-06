import {
  EnumGameWinnerStatus
} from '../enum/account.enum';

export type Profile = {
  id: number,
  username: string,
  login: string
}

export type Statistic = {
  points: number,
  games: {
    total: number,
    wone: number,
    lose: number,
  }
}

export type History = {
  id: number,
  winnerStatus: EnumGameWinnerStatus,
  steps: number,
  winnerPoints: number,
  loserPoints: number,
  createdAt: Date,
  finishAt: Date
}