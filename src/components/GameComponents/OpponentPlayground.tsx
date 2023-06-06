import { useEffect } from "react";
import { IOpponentPlaygroundProps as IProps } from "../../props/game.props";
import {
  renderingCanvasPlaground,
} from '../../utils/canvas';

const OpponentPlayground = (props: IProps) => {

  useEffect(() => {
    if (!props.canvasRef) return;

    const canvas = props.canvasRef.current;

    if (!canvas) return;

    renderingCanvasPlaground(canvas, props.cellSize);
  })

  return (
    <>
      <canvas
        style={{
          margin: 'auto',
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        ref={props.canvasRef}
        width={props.width}
        height={props.height}
        onClick={props.onClick}
      />
    </>
  )
}
export default OpponentPlayground;