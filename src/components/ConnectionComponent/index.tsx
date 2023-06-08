import {
  useState,
  useContext
} from 'react';
import {
  GridRenderCellParams,
  GridTreeNodeWithRender
} from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GameService from '../../service/game-service';
import { AlertContext } from '../../manager/alert-manager';
import { EnumAlertType } from '../../enum/main.enum';

interface IBtnConnectProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
}

const ConnectionComponent = ({ params }: IBtnConnectProps) => {
  const { addAlert } = useContext(AlertContext);
  const [inPass, setPass] = useState('');
  const token = localStorage.getItem('token');
  const gameId = params.row.id;
  const password = params.row.password;

  const handleChange = (evt: any) => {
    setPass(evt.currentTarget.value);
  }

  const handleConnect = () => {
    if (params.row.privacy && inPass !== password) {
      addAlert(EnumAlertType.error, "Wrong password!");
      return;
    }

    if (token) {
      GameService.connect({ token, gameId, password })
      .then(() => {
        setPass('');
        window.location.href = `/game/${gameId}`;
      })
      .catch(err => addAlert(EnumAlertType.warning, err.message));
    } else {
      window.localStorage.clear();
      window.location.href = "/";
    }
  }

  return (
    <>
      {params.row.privacy ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <TextField label='Password' variant='filled' value={inPass} onChange={handleChange}/>
            <Button variant='contained' onClick={handleConnect}>
              Connect
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button variant='contained' onClick={handleConnect}>
            Connect
          </Button>
        </>
      )}
    </>
  )
}

export default ConnectionComponent;