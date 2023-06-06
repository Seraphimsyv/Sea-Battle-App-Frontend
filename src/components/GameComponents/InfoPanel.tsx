import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';

import { EnumGameStatus } from '../../enum/game.enum';

import { IInfoPanelProps as IProps } from '../../props/game.props';

const InfoPanel = (props: IProps) => {

  const handleGetUsername = (turn: number) => {
    const userId: number = Number(Object.keys(props.gameInfo.players)[turn]);
    return props.gameInfo.players[userId].userData.username;
  }

  return (
    <>
      <Box sx={{ height: '100%', textAlign: 'center' }} >
        <Card sx={{ margin: 'auto', padding: '2em' }}>
          <Typography variant="h5">
            Game: {props.gameInfo.info.name}
          </Typography>
          <Typography variant="h5">
            Status: {EnumGameStatus[props.gameInfo.info.status]}
          </Typography>
          <Typography variant="h5">
            Privacy: {props.gameInfo.info.privacy.type ? (
              <>
                <SecurityIcon color='error' />
              </>
            ) : (
              <>
                <PublicIcon color='info' />
              </>
            )}
          </Typography>
          {props.gameInfo.info.privacy.type && (
            <>
              <Typography variant="h5">
                Password: {props.gameInfo.info.privacy?.password}
              </Typography>
            </>
          )}
          <Typography variant="h5">
            Step: {props.gameInfo.info.step}
          </Typography>
          <Typography variant="h5">
            Turn: {handleGetUsername(props.gameInfo.info.turn)}
          </Typography>
          {props.gameInfo && props.gameInfo.info.status === EnumGameStatus.Preparation ? (
            <Button sx={{ marginTop: '1em' }} variant="contained" onClick={props.callbackPlayerStatus} >
              Ready
            </Button>
          ) : null}
        </Card>
      </Box>
    </>
  )
}

export default InfoPanel;