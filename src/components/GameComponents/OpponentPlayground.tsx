import {
  useState,
  useEffect
} from "react";
import PlayerStatus from './PlayerStatus';
import { EnumGameStatus } from "../../enum/game.enum";
import { IOpponentPlaygroundProps as IProps } from "../../props/game.props";
import {
  renderingLocation,
  renderingCanvasPlaground,
} from '../../utils/canvas';
import { Location } from "../../types/game.types";

const OpponentPlayground = (props: IProps) => {
  const [playerId, setPlayerId] = useState<number | undefined>(undefined);
  const [missed, setMissed] = useState<Location[]>([]);
  const [destroyed, setDestoyed] = useState<Location[]>([]);

  useEffect(() => {
    if (props.gameInfo && props.playerId) {
      const playersIds = Object.keys(props.gameInfo.players);
      const id = playersIds[0] === String(props.playerId) ? playersIds[1] : playersIds[0];

      setPlayerId(Number(id));
    }
  }, [props.gameInfo, props.playerId])

  useEffect(() => {
    if (
      playerId 
      && (
        props.gameInfo?.info.status === EnumGameStatus.InGame
        || props.gameInfo?.info.status === EnumGameStatus.Finish
      )
    ) {
      if (missed !== props.gameInfo.players[playerId].playground.missed) {
        setMissed(props.gameInfo.players[playerId].playground.missed);
      }

      if (destroyed !== props.gameInfo.players[playerId].playground.destroyed) {
        setDestoyed(props.gameInfo.players[playerId].playground.destroyed);
      }
    }
  }, [
    playerId,
    missed,
    destroyed,
    props.gameInfo,
  ])

  useEffect(() => {
    if (!props.canvasRef) return;

    const canvas = props.canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    renderingCanvasPlaground(canvas, props.cellSize);

    if (missed && destroyed) {
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
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {props.gameInfo && playerId ? (
          <>
            <PlayerStatus
              status={props.gameInfo.players[playerId].status}
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
          onClick={props.onClick}
        />
      </div>
    </>
  )
}
export default OpponentPlayground;