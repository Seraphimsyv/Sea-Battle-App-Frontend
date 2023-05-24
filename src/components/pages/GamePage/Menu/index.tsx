import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { GameMenuProps as PropsTypes } from '../../../../props/game.props';
import {
  EnumGameStatus
} from '../../../../enum';

export const Menu = (props: PropsTypes) => {
  return (
    <>
      <div style={{ margin: 'auto' }}>
        <Stack direction='column'>
          {props.gameStatus?.status === EnumGameStatus.PREPARE ? (
            <>
              <Button
                variant="contained"
                onClick={props.callbackSetReady}
              >
                Ready
              </Button>
            </>
          ) : <></>}
          {props.gameStatus?.status === EnumGameStatus.FINISHED ? (
            <>
              <h3>Winner - {props.gameStatus.winner}</h3>
            </>
          ) : <></>}
          {props.gameStatus?.status === EnumGameStatus.PROCESSING ? (
            <>
              <h3>Step - {props.gameStatus.step}</h3>
            </>
          ) : <></>}
        </Stack>
      </div>
    </>
  )
}