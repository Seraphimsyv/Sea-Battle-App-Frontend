import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CableIcon from '@mui/icons-material/Cable';
import LogoutIcon from '@mui/icons-material/Logout';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { TemplatePage } from '../../TemplatePage';
import {
  IMainProps,
  ICreateProps,
  IConnectProps
} from '../../../props/menu.props';

const MainWindow : React.FC<IMainProps> = (props: IMainProps) => {
  return (
    <>
      <Stack direction="column" spacing={4}>
        <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={props.callbackSetCreate}>
          Create game
        </Button>
        <Button variant="outlined" startIcon={<CableIcon />} onClick={props.callbackSetConnect}>
          Connect to game
        </Button>
        <Button variant="outlined" startIcon={<LeaderboardIcon />} onClick={() => window.location.href = '/statistic'}>
          Statisticboard
        </Button>
        <Button variant="outlined" startIcon={<LogoutIcon />} onClick={props.callbackLogout}>
          Log out
        </Button>
      </Stack>
    </>
  )
}

const CreateWindow : React.FC<ICreateProps> = (props: ICreateProps) => {
  const [value, setValue] = useState("");
  /**
   * User input save handler for create game password
   */
  const handleSetValue = (evt: any) => {
    setValue(evt.currentTarget.value);
  }
  /**
   * Game creation handler
   */
  const handleCreateGame = () => {
    fetch('/api/game/create', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'create', token: `${localStorage.getItem('token')}`, password: value })
    })
    .then(res => res.json())
    .then(res => {
      if (res.status) {
        localStorage.setItem('password', value);
        window.location.href = '/game';
      } else {
        alert('Game with this password, already exists!');
      }
    });
  }

  return (
    <>
      <Stack direction="column" spacing={4} sx={{ margin: 'auto' }}>
        <TextField
          required
          label="Password"
          autoFocus
          onChange={handleSetValue} 
        />
        <Button variant="outlined" onClick={handleCreateGame}>
          Create
        </Button>
        <Button variant="outlined" onClick={props.callbackClose}>
          Close
        </Button>
      </Stack>
    </>
  )
}

const ConnectWindow : React.FC<IConnectProps> = (props: IConnectProps) => {
  const [value, setValue] = useState("");
  /**
   * User input save handler for connection game password
   * @param evt 
   */
  const handleSetValue = (evt: any) => {
    setValue(evt.currentTarget.value);
  }
  /**
   * Game connection handler
   */
  const handleConnectToGame = () => {
    fetch('/api/game/check-exists', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'connect', token: `${localStorage.getItem('token')}`, password: value })
    })
    .then(res => res.json())
    .then(res => {
      if (res.status) {
        localStorage.setItem('password', value);
        window.location.href = '/game';
      } else {
        alert('Game with this password, not exists!');
      }
    });
  }

  return (
    <>
      <Stack direction="column" spacing={4} sx={{ margin: 'auto' }}>
        <TextField
          required
          label="Password"
          autoFocus
          onChange={handleSetValue} 
        />
        <Button variant="outlined" onClick={handleConnectToGame}>
          Connect
        </Button>
        <Button variant="outlined" onClick={props.callbackClose}>
          Close
        </Button>
      </Stack>
    </>
  )
}

export const HomePage  = () => {
  const [currentWindow, setWindow] = useState<0 | 1 | 2 | 4>(0);

  return (
    <>
      <TemplatePage>
        {currentWindow === 0 ? (
          <>
            <MainWindow
              callbackSetCreate={() => setWindow(1)}
              callbackSetConnect={() => setWindow(2)}
              callbackLogout={() => {
                localStorage.clear();
                window.location.href = '/log-in';
              }}
            />
          </>
        ) : currentWindow === 1 ? (
          <>
            <CreateWindow
              callbackClose={() => setWindow(0)}
            />
          </>
        ) : (
          <>
            <ConnectWindow
              callbackClose={() => setWindow(0)}
            />
          </>
        )}
      </TemplatePage>
    </>
  )
}