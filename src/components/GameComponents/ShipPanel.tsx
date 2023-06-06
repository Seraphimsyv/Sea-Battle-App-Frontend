import Badge from '@mui/material/Badge';

import { IShipProps as IProps } from "../../props/game.props";

const ShipPanel = (props: IProps) => {

  return (
    <>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          left: '110%'
        }}
      >
        <div 
          id="draggable-element"
          onDragStart={(evt) => props.callbackDragStart(1, evt)}
          onDragEnd={props.callbackDragEnd}
          draggable={props.count.small.current > 0 ? true : false}
        >
          <Badge badgeContent={props.count.small.current} color="primary">
            <div>
              {Array(props.count.small.default).fill(null).map((v, k) => (
                <div  
                  key={k}
                  style={{
                    width: props.cellSize,
                    height: props.cellSize,
                    background: 'black'
                  }}
                />
              ))}
            </div>
          </Badge>
        </div>
        <div 
          id="draggable-element"
          onDragStart={(evt) => props.callbackDragStart(2, evt)}
          onDragEnd={props.callbackDragEnd}
          draggable={props.count.medium.current > 0 ? true : false}
        >
          <Badge badgeContent={props.count.medium.current} color="primary">
            <div>
              {Array(props.count.medium.default).fill(null).map((v, k) => (
                <div  
                  key={k}
                  style={{
                    width: props.cellSize,
                    height: props.cellSize,
                    background: 'black'
                  }}
                />
              ))}
            </div>
          </Badge>
        </div>
        <div 
          id="draggable-element"
          onDragStart={(evt) => props.callbackDragStart(3, evt)}
          onDragEnd={props.callbackDragEnd}
          draggable={props.count.large.current > 0 ? true : false}
        >
          <Badge badgeContent={props.count.large.current} color="primary">
            <div>
              {Array(props.count.large.default).fill(null).map((v, k) => (
                <div  
                  key={k}
                  style={{
                    width: props.cellSize,
                    height: props.cellSize,
                    background: 'black'
                  }}
                />
              ))}
            </div>
          </Badge>
        </div>
      </div>
    </>
  )
}

export default ShipPanel;