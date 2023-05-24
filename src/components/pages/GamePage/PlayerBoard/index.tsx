import * as React from 'react';
import { useRef, useState } from 'react';
import { PlayerGrid } from './player.grid';
import { PlayerShip } from './player.ship';
import { GameService } from '../../../../service/game-service';
import { PlayerBoardProps as PropsTypes } from '../../../../props/player.props';
import {

} from '../../../../types';
import {
  EnumGameStatus
} from '../../../../enum';
import { CELL_SIZE, MAX_SHIP, CANVAS } from '../../../../constants';


export const PlayerBoard = (props: PropsTypes) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLDivElement | null>(null);
  /**
   * 
   * @param event 
   */
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!props.gameStatus) return;
    
    if (props.gameStatus.status !== EnumGameStatus.PREPARE) return;

    const target = event.target as HTMLDivElement;
    event.dataTransfer?.setData("text/plain", target.id);

    if (target.style.top !== "0px" || target.style.left !== '0px') {
      const col = Math.floor(Number(target.style.left.slice(0, target.style.left.length - 2)) / CELL_SIZE);
      const row = Math.floor(Number(target.style.top.slice(0, target.style.top.length - 2)) / CELL_SIZE);
      GameService.delShip({ col: col, row: row });
    }

    setIsDragging(true);
    setDraggedElement(target);
  };
  /**
   * 
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElement(null);
  }
  /**
   * 
   * @param event 
   */
  const handleDragEnter = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.style.background = "none";
    event.currentTarget.style.background = CANVAS.general.background;
  };
  /**
   * 
   * @param event 
   */
  const handleDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    if (draggedElement) {
      const col = Math.floor(event.nativeEvent.offsetX / CELL_SIZE);
      const row = Math.floor(event.nativeEvent.offsetY / CELL_SIZE);

      const res = GameService.addShip({col: col, row: row}, true);

      event.currentTarget.style.background = "none";
      
      if (!res) {
        event.currentTarget.style.background = "linear-gradient(180deg, #f26161 0%, #0077b6 100%)";
      } else {
        event.currentTarget.style.background = CANVAS.general.background;
      }
    }
  };
  /**
   * 
   * @param event 
   */
  const handleDragLeave = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.currentTarget.style.background = "none";
    event.currentTarget.style.background = CANVAS.general.background;
  };
  /**
   * 
   * @param event 
   * @returns 
   */
  const handleDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.style.background = "none";
    event.currentTarget.style.background = CANVAS.general.background;

    if (!isDragging) return;
    if (!draggedElement) return;

    const data = event.dataTransfer?.getData("text/plain");

    if (data) {
      const col = Math.floor(event.nativeEvent.offsetX / CELL_SIZE);
      const row = Math.floor(event.nativeEvent.offsetY / CELL_SIZE);
      
      const res = GameService.addShip({col: col, row: row})

      if (res === true) {
        draggedElement.style.left = `${col * CELL_SIZE}px`; 
        draggedElement.style.top = `${row * CELL_SIZE}px`;
      } else {
        alert("You can't put ships too close!");
      }
    }
  };

  return (
    <>
      <div className='div__board' style={{ position: 'relative' }}>
        <PlayerGrid 
          canvasRef={canvasRef}
          callbackDragEnter={handleDragEnter}
          callbackDragOver={handleDragOver}
          callbackDragLeave={handleDragLeave}
          callbackDrop={handleDrop}
          shipList={props.playerPlaygroundPoints?.shipsList}
          missedList={props.playerPlaygroundPoints?.missedList}
          destroyedList={props.playerPlaygroundPoints?.destroyedList}
        />
        {props.gameStatus?.status === EnumGameStatus.PREPARE
          ? Array(MAX_SHIP).fill(null).map((value, key) => (
              <PlayerShip 
                key={key}
                callbackDragStart={handleDragStart}
                callbackDragEnd={handleDragEnd}
            />))
          : <></>
        }
      </div>
    </>
  )
}