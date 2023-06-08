import { EnumPlayerStatus } from "../enum/game.enum";
import { GameInfo, Message } from "../types/game.types";

interface IPlaygroundProps {
  gameInfo: GameInfo;
  playerId: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  cellSize: number;
}

export interface IPlayerPlaygroundProps extends IPlaygroundProps {
  count: {
    small: {
      current: number;
      default: number;
    },
    medium: {
      current: number;
      default: number;
    },
    large: {
      current: number;
      default: number;
    },
  };
  callbackOnClick: (evt: React.MouseEvent<HTMLCanvasElement>) => void;
  callbackContextMenu: (evt: React.MouseEvent<HTMLCanvasElement>) => void;
  callbackDragEnter: (evt: React.DragEvent<HTMLCanvasElement>) => void;
  callbackDragOver: (evt: React.DragEvent<HTMLCanvasElement>) => void;
  callbackDragLeave: (evt: React.DragEvent<HTMLCanvasElement>) => void;
  callbackOnDrop: (evt: React.DragEvent<HTMLCanvasElement>) => void;
  callbackDragStart: (shipSize: number, evt: React.DragEvent<HTMLDivElement>) => void;
  callbackDragEnd: () => void;
}

export interface IOpponentPlaygroundProps extends IPlaygroundProps {
  onClick: (evt: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface IShipProps {
  count: {
    small: {
      current: number;
      default: number;
    },
    medium: {
      current: number;
      default: number;
    },
    large: {
      current: number;
      default: number;
    },
  };
  cellSize: number;
  callbackDragStart: (shipSize: number, evt: React.DragEvent<HTMLDivElement>) => void;
  callbackDragEnd: () => void;
}

export interface IPlayerStatusProps {
  status: EnumPlayerStatus;
}

export interface IInfoPanelProps {
  gameInfo: GameInfo;
}

export interface IChatProps {
  gameId: string;
  messages: Message[];
}

export interface IMessageProps {
  username: string;
  message: string;
}

export interface IStatProps {
  gameInfo: GameInfo;
  playerId: number;
}
