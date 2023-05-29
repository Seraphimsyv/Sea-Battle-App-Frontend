import * as React from 'react';
import { useEffect } from 'react';
import { PlayerGridProps as PropsTypes } from '../../../../props/player.props';
import { CELL_SIZE, CANVAS } from '../../../../constants';

export const PlayerGrid = (props: PropsTypes) => {
  /**
   * Ship rendering canvas handler
   */
  const DrawShips = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas) return;
    if (!context) return;
    if (!props.shipList) return;
     
    context.fillStyle = 'white';

    props.shipList.forEach(point => {
      context.fillRect(point.x * CELL_SIZE, point.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })
  }
  /**
   * Non-hit rendering canvas handler
   */
  const DrawMissedShot = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas) return;
    if (!context) return;
    if (!props.missedList) return;
     
    context.fillStyle = 'blue';

    props.missedList.forEach(point => {
      context.fillRect(point.x * CELL_SIZE, point.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })
  }
  /**
   * Destroyed rendering canvas handler
   */
  const DrawDestroyedShips = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas) return;
    if (!context) return;
    if (!props.destroyedList) return;
     
    context.fillStyle = 'red';

    props.destroyedList.forEach(point => {
      context.fillRect(point.x * CELL_SIZE, point.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })
  }
  /**
   * Hook for drawing canvas
   */
  useEffect(() => {
    const canvas = props.canvasRef.current;
    if (!canvas) return;

    canvas.style.background = CANVAS.general.background;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;
        context.strokeStyle = CANVAS.general.lineColor;
        context.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
      }
    }

    DrawShips();
    DrawMissedShot();
    DrawDestroyedShips();
  });

  return (
    <>
      <canvas
        id="canvas__battlefield"
        style={{ margin: '0em' }}
        ref={props.canvasRef}
        width={CELL_SIZE * 10}
        height={CELL_SIZE * 10}
        onDragEnter={props.callbackDragEnter}
        onDragOver={props.callbackDragOver}
        onDragLeave={props.callbackDragLeave}
        onDrop={props.callbackDrop}
      />
    </>
  )  
}