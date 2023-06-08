import {
  useState,
  useContext
} from 'react';
import { 
  FormControlLabel,
  FormGroup, 
  FormLabel
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import GameService from '../../service/game-service';
import { AlertContext } from '../../manager/alert-manager';
import { EnumAlertType } from '../../enum/main.enum';

const CreatePage = () => {
  const { addAlert } = useContext(AlertContext);
  const [name, setName] = useState('');
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  /**
   * 
   * @param evt 
   */
  const handleChangeName = (evt: any) : void => {
    setNameValid(true);
    setName(evt.currentTarget.value);
  }
  /**
   * 
   * @param evt 
   */
  const handleChangePrivacy = (evt: any) => {
    setPrivacy(evt.target.checked);
  }
  /**
   * 
   * @param evt 
   */
  const handleChangePassword = (evt: any) => {
    setPassValid(true);
    setPassword(evt.currentTarget.value);
  }
  /**
   * 
   * @returns 
   */
  const handleCreateGame = () => {
    const token = localStorage.getItem('token');

    if (!privacy && name.length === 0) {
      setNameValid(false);
      addAlert(EnumAlertType.error, 'Empty name')
      return;
    }

    if (privacy) {
      if (name.length === 0 && password.length === 0) {
        setNameValid(false);
        setPassValid(false);
        addAlert(EnumAlertType.error, 'Empty name & password')
        return;
      }

      if (name.length === 0) {
        setNameValid(false);
        addAlert(EnumAlertType.error, 'Empty name')
        return;
      }

      if (password.length === 0) {
        setPassValid(false)
        addAlert(EnumAlertType.error, 'Empty password')
        return;
      }
    }

    if (token !== null) {
      if (privacy) {
        const body = { name: name, privacy: privacy, password: password };
        
        GameService.create({ token, body })
        .then(gameId => {
          GameService.connect({ token, gameId: gameId })
          .then(() => {
            setName('');
            setPassword('');
            window.location.href = `/game/${gameId}`;
          })
          .catch(err => addAlert(EnumAlertType.error, err.message))
        })
        .catch(err => addAlert(EnumAlertType.error, `Error create: ${err}`))
      } else {
        const body = { name: name, privacy: privacy }

        GameService.create({ token, body })
        .then(gameId => {
          GameService.connect({ token, gameId: gameId, password: password })
          .then(() => window.location.href = `/game/${gameId}`)
          .catch(err => addAlert(EnumAlertType.error, err.message))
        })
        .catch(err => addAlert(EnumAlertType.error, `Error create: ${err}`))
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          width: '60%',
          margin: 'auto'
        }}
      >
        <Paper
          sx={{
            padding: '1em'
          }}
        >
          <Stack
            direction='column'
            spacing={2}
          >
            <Stack
              direction='row'
              sx={{
                justifyContent: 'space-evenly'
              }}
            >
              <Stack
                direction='column'
                spacing={2}
                sx={{
                  justifyContent: 'space-between'
                }}
              >
                <FormLabel component='legend'>Game name:</FormLabel>
                <FormGroup>
                  <TextField
                    label="Name"
                    variant="standard"
                    value={name}
                    error={!nameValid}
                    onChange={handleChangeName}
                  />
                </FormGroup>
              </Stack>
              <Stack
                direction='column'
                spacing={2}
                sx={{
                  justifyContent: 'space-between'
                }}
              >
                <FormLabel component='legend'>Privacy:</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={privacy} onChange={handleChangePrivacy} name="privacy" />
                    }
                    label={privacy ? "Private" : "Public"}
                  />
                </FormGroup>
              </Stack>
              {privacy && (
                <>
                  <Stack
                    direction='column'
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between'
                    }}
                  >
                    <FormLabel component='legend'>Password:</FormLabel>
                    <FormGroup>
                      <TextField
                        label='Password'
                        variant="standard"
                        value={password}
                        error={!passValid}
                        onChange={handleChangePassword}
                      />
                    </FormGroup>
                  </Stack>
                </>
              )}
            </Stack>
            <Button
              variant='contained'
              onClick={handleCreateGame}
            >
              Create
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}

export default CreatePage;