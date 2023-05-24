import * as React from 'react';

import { CELL_SIZE } from '../../../../constants';

interface IProps {
  callbackDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  callbackDragEnd: () => void;
}
/**
 * 
 * @param props 
 * @returns 
 */
export const PlayerShip = (props: IProps) => {
  return (
    <>
      <div
        className="div__playerboard_ship"
        id="draggable-element"
        draggable
        onDragStart={props.callbackDragStart}
        onDragEnd={props.callbackDragEnd}
        style={{
          position: "absolute",
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: "red",
          left: 0,
          top: "100%",
        }}
      />
    </>
  )
}