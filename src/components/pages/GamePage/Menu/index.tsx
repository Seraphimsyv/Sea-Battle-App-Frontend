import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import LogoutIcon from '@mui/icons-material/Logout';
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
                endIcon={<ExpandCircleDownIcon />}
              >
                Ready
              </Button>
            </>
          ) : <></>}
          {props.gameStatus?.status === EnumGameStatus.FINISHED ? (
            <>
              <h3>Winner - {props.gameStatus.winner}</h3>
              <Button
                variant="contained"
                onClick={props.callbackLeaveGame}
                endIcon={<LogoutIcon />}
              >
                Leave game
              </Button>
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