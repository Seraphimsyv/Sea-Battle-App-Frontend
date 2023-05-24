import {
  Message,
  GameStatus,
  OpponentStatus
} from '../types'

export type GameHeaderProps = {
  gameStatus?: GameStatus,
  opponentStatus?: OpponentStatus,
  gameTurn?: number,
  playersPoints: {
    player: number,
    opponent: number
  }
};

export type GameMenuProps = {
  gameStatus?: GameStatus,
  opponentStatus?: OpponentStatus,
  callbackSetReady: () => void
}

export type GameChatProps = {
  messageList: Message[],
  callbackSendMessage: (message: string) => void
}