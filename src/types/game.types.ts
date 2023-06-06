import {
  EnumPlayerStatus,
  EnumShipStatus,
  EnumGameStatus
} from '../enum/game.enum';

export type Location = {
  x: number,
  y: number
}

export type Create = {
  token: string,
  body: {
    name: string,
    privacy: boolean,
    password?: string
  }
}

export type Check = {
  token: string,
  gameId: string,
  playerId?: number,
}

export type Connect = Check & {
  password?: string
}

export type AddShip = Check & {
  ships: Ship[]
}

export type CheckShot = Check & {
  location: Location
}

export type LoadMessages = Check & {}

export type SendMessage = LoadMessages & {
  message: string
}

export type Message = {
  gameId: string,
  username: string,
  message: string,
}

export type Ship = {
  locations: Location[],
  status: EnumShipStatus
}

export type UserData = {
  id: number,
  login: string,
  password: string,
  username: string
}

export type PlaygroundData = {
  missed: Location[],
  destroyed: Location[],
  ship: Ship[]
}

export type PlayerData = {
  userData: UserData,
  status: EnumPlayerStatus
  point: number,
  playground: PlaygroundData
}

export type PlayerRecord = Record<number, PlayerData>;

export type PrivacyData = {
  type: boolean,
  password?: string
}

export type GameInfo = {
  players: PlayerRecord,
  info: {
    name: string,
    privacy: PrivacyData,
    status: EnumGameStatus,
    turn: number,
    step: number
  }
}