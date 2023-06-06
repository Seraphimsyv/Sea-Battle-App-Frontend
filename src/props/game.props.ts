import { GameInfo } from "../types/game.types";

interface IPlaygroundProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  cellSize: number;
}

export interface IPlayerPlaygroundProps extends IPlaygroundProps {
  gameInfo?: GameInfo;
  playerId?: number;
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

export interface IInfoPanelProps {
  gameInfo: GameInfo;
  callbackPlayerStatus: () => void;
}