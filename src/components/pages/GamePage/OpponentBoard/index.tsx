import * as React from 'react';
import { useRef } from 'react';
import { OpponentGrid } from './opponent.grid';
import { OpponentBoardProps as PropsTypes } from '../../../../props/player.props';

export const OpponentBoard = (props: PropsTypes) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /**
   * 
   * @param event 
   * @returns 
   */

  return (
    <>
      <div className='div__board' style={{ position: 'relative' }}>
        <OpponentGrid
          canvasRef={canvasRef}
          gameStatus={props.gameStatus}
          callbackCheckShot={props.callbackCheckShot}
          missedList={props.missedList}
          destroyedList={props.destroyedList}
        />
      </div>
    </>
  )
}