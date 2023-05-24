import * as React from 'react';
import { useEffect } from 'react';
import { OpponentGridProps as PropsTypes } from '../../../../props/player.props';
import { CELL_SIZE, CANVAS } from '../../../../constants';
import { EnumGameStatus } from '../../../../enum';

export const OpponentGrid = (props: PropsTypes) => {
  /**
   * 
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
   * 
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
   * 
   */
  const DrawClearGrid = () => {
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

    DrawMissedShot();
    DrawDestroyedShips();
  }
  /**
   * 
   * @param event 
   * @returns 
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    DrawClearGrid();

    if (props.gameStatus?.status !== EnumGameStatus.PROCESSING) return;

    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas) return;
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const col = Math.floor(offsetX / CELL_SIZE);
    const row = Math.floor(offsetY / CELL_SIZE);
    
    context.fillStyle = 'gainsboro';
    context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  };
  /**
   * 
   * @param event 
   */
  const handleOnClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const col = Math.floor(offsetX / CELL_SIZE);
    const row = Math.floor(offsetY / CELL_SIZE);

    props.callbackCheckShot({ x: col, y: row });
  }
  /**
   * 
   */
  useEffect(() => {
    DrawClearGrid();
  });

  return (
    <>
      <canvas
        id="canvas__battlefield"
        style={{ margin: '0em' }}
        ref={props.canvasRef}
        width={CELL_SIZE * 10}
        height={CELL_SIZE * 10}
        onClick={handleOnClick}
        onMouseMove={handleMouseMove}
      />
    </>
  )
}