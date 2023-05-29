import * as React from 'react';
import { GameShipProps as PropsTypes } from '../../../../props/game.props';
import { CELL_SIZE } from '../../../../constants';

export const PlayerShip = (props: PropsTypes) => {
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