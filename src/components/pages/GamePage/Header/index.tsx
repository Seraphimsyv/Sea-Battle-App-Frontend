import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { GameHeaderProps as PropsTypes } from '../../../../props/game.props';
import {
  EnumGameStatus
} from '../../../../enum'

export const Header = (props: PropsTypes) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem('user') || '')['username'])
  }, [])

  return (
    <>
      <Stack sx={{ marginTop: 0 }}>
        <AppBar position='static' color='primary'>
          <Toolbar
            sx={
              {
                dispay: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          >
            <Stack direction='row'>
              <AccountCircle sx={{ margin: 'auto' }} />
              {props.gameStatus?.status === EnumGameStatus.PREPARE ? (
                <>
                  <p>{username}</p>
                </>
              ) : (
                <>
                  <p>{username} - {props.playersPoints.player}</p>
                </>
              )}
            </Stack>
            <Stack sx={{ textAlign: 'center' }} direction='column'>
              <p>
                <span>GAME STAGE - </span>
                {props.gameStatus?.status === EnumGameStatus.PREPARE
                  ? "Prepare" : props.gameStatus?.status === EnumGameStatus.PROCESSING
                  ? "Processing" : props.gameStatus?.status === EnumGameStatus.FINISHED
                  ? "Finished" : "Connection"
                }
              </p>
              {props.gameStatus?.status === EnumGameStatus.PROCESSING ? (
                <>{props.gameTurn === 0 ? (
                  <>
                    <p>Opponent turn</p>
                  </>
                ) : (
                  <>
                    <p>Your turn</p>
                  </>
                )}</>
              ) : <></>}
            </Stack>
            <Stack direction='row'>
              {props.gameStatus?.status === EnumGameStatus.PREPARE ? (
                <>
                  <p>{props.opponentStatus?.username}</p>
                </>
              ) : (
                <>
                  <p>{props.playersPoints.opponent} - {props.opponentStatus?.username}</p>
                </>
              )}
              <AccountCircle sx={{ margin: 'auto' }} />
            </Stack>
          </Toolbar>
        </AppBar>
      </Stack>
    </>
  )
}