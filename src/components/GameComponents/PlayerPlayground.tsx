import { 
  useState,
  useEffect
} from "react";
import { IPlayerPlaygroundProps as IProps } from "../../props/game.props";
import ShipPanel from "./ShipPanel";
import {
  renderingShipsLocation,
  renderingCanvasPlaground,
} from '../../utils/canvas';
import { Ship as ShipType } from '../../types/game.types';
import { EnumGameStatus } from "../../enum/game.enum";
import { GameManager } from "../../manager/game-manager";

const PlayerPlayground = (props: IProps) => {
  const [locations, setLocations] = useState<ShipType[]>([]);

  useEffect(() => {
    if (props.gameInfo?.info.status === EnumGameStatus.Preparation) {
      if (locations !== GameManager.ships) {
        setLocations(GameManager.ships)
      }
    }
    if (props.playerId && props.gameInfo?.info.status === EnumGameStatus.InGame) {
      if (locations !== props.gameInfo.players[props.playerId].playground.ship) {
        setLocations(props.gameInfo.players[props.playerId].playground.ship)
      }
    }
  }, [
    locations,
    props.gameInfo?.info.status,
    props.gameInfo?.players,
    props.playerId
  ])

  useEffect(() => {    
    if (!props.canvasRef) return;

    const canvas = props.canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    renderingCanvasPlaground(canvas, props.cellSize);

    if (locations && locations.length > 0) {

      if (!context) return;

      locations.forEach(loc => {
        loc.locations.forEach(l => {
          renderingShipsLocation(context, l, props.cellSize);
        })
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
          onContextMenu={props.callbackContextMenu}
          onDragEnter={props.callbackDragEnter}
          onDragOver={props.callbackDragOver}
          onDragLeave={props.callbackDragLeave}
          onDrop={props.callbackOnDrop}
        />
        {props.gameInfo && props.gameInfo.info.status === EnumGameStatus.Preparation ? (
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