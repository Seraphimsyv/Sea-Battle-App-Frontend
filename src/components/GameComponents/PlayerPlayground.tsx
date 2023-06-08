import { 
  useState,
  useEffect
} from "react";
import { IPlayerPlaygroundProps as IProps } from "../../props/game.props";
import PlayerStatus from "./PlayerStatus";
import ShipPanel from "./ShipPanel";
import GameManager from "../../manager/game-manager";
import {
  renderingLocation,
  renderingCanvasPlaground,
} from '../../utils/canvas';
import { Location, Ship } from '../../types/game.types';
import { EnumGameStatus, EnumPlayerStatus } from "../../enum/game.enum";

const PlayerPlayground = (props: IProps) => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [missed, setMissed] = useState<Location[]>([]);
  const [destroyed, setDestoyed] = useState<Location[]>([]);
  /**
   * 
   */
  useEffect(() => {
    if (!props.gameInfo && !props.playerId) return;
    
    const gameStatus = props.gameInfo.info.status;
    const playerStatus = props.gameInfo.players[props.playerId].status;

    if (gameStatus === EnumGameStatus.Preparation) {
      if (playerStatus === EnumPlayerStatus.Preparation) {
        if (ships !== GameManager.ships) {
          setShips(GameManager.ships)
        }
      }

      if (playerStatus === EnumPlayerStatus.Ready) {
        setShips(props.gameInfo.players[props.playerId].playground.ship);
      }
    }
  
    if ([EnumGameStatus.InGame, EnumGameStatus.Finish].includes(gameStatus)) {
      if (ships !== props.gameInfo.players[props.playerId].playground.ship) {
        setShips(props.gameInfo.players[props.playerId].playground.ship)
      }

      if (missed !== props.gameInfo.players[props.playerId].playground.missed) {
        setMissed(props.gameInfo.players[props.playerId].playground.missed);
      }

      if (destroyed !== props.gameInfo.players[props.playerId].playground.destroyed) {
        setDestoyed(props.gameInfo.players[props.playerId].playground.destroyed);
      }
    }
  }, [
    ships, missed, destroyed, 
    props.playerId,
    props.gameInfo.info.status, props.gameInfo.players, props.gameInfo
  ])
  /**
   * 
   */
  useEffect(() => {    
    if (!props.canvasRef) return;

    const canvas = props.canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    renderingCanvasPlaground(canvas, props.cellSize);

    if (ships && missed && destroyed) {
      ships.forEach((ship: Ship) => {
        ship.locations.forEach((location: Location) => {
          renderingLocation(context, location, 'green', props.cellSize);
        })
      });
      missed.forEach((location: Location) => {
        renderingLocation(context, location, 'yellow', props.cellSize);
      })
      destroyed.forEach((location: Location) => {
        renderingLocation(context, location, 'red', props.cellSize);
      }) 
    }
  })

  return (
    <>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {props.gameInfo && props.playerId ? (
            <>
              <PlayerStatus
                status={props.gameInfo.players[props.playerId].status}
              />
            </>
          ): (null)}
          <canvas
            style={{
              width: `${props.width}`,
              height: `${props.height}`,
              border: '2px solid #000',
              borderRadius: '10px',
              boxShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}
            ref={props.canvasRef}
            width={props.width}
            height={props.height}
            onClick={props.callbackOnClick}
            onContextMenu={props.callbackContextMenu}
            onDragEnter={props.callbackDragEnter}
            onDragOver={props.callbackDragOver}
            onDragLeave={props.callbackDragLeave}
            onDrop={props.callbackOnDrop}
          />
        </div>
        {props.gameInfo 
        && props.playerId
        && props.gameInfo.players[props.playerId].status === EnumPlayerStatus.Preparation ? (
          <ShipPanel
            count={props.count}
            cellSize={props.cellSize}
            callbackDragStart={props.callbackDragStart}
            callbackDragEnd={props.callbackDragEnd}
          />
        ) : (null)}
      </div>
    </>
  )
}

export default PlayerPlayground;