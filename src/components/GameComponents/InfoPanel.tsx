import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import { IInfoPanelProps as IProps } from '../../props/game.props';
import { EnumGameStatus } from '../../enum/game.enum';

const InfoPanel = ({ gameInfo }: IProps) => {
  const handleGetUsername = (turn: number) => {
    const userId: number = Number(Object.keys(gameInfo.players)[turn]);
    return gameInfo.players[userId].userData.username;
  }

  return (
    <>
      <Box sx={{
          height: '20%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Stack
          spacing={3}
          direction='row'
        >
          <Chip
            label={`Game: ${gameInfo.info.name}`}
          />
          <Chip
            label={`Status: ${EnumGameStatus[gameInfo.info.status]}`}
          />
          <Chip
            label={gameInfo.info.privacy.type ? (
              <Stack direction='row' spacing={2}>
                <p>Privacy:</p>
                <div style={{ margin: 'auto' }}>
                  <SecurityIcon color='error' />
                </div>
              </Stack>
            ) : (
              <Stack direction='row' spacing={2}>
                <p>Privacy:</p>
                <div style={{ margin: 'auto' }}>
                  <PublicIcon color='info' />
                </div>
              </Stack>
            )}
          />
          {gameInfo.info.privacy.type && (
            <Chip
              label={`Password: ${gameInfo.info.privacy?.password}`}
            />
          )}
          <Chip
            label={`Step: ${gameInfo.info.step}`}
          />
          <Chip
            label={`Turn: ${handleGetUsername(gameInfo.info.turn)}`}
          />
        </Stack>
      </Box>
    </>
  )
}

export default InfoPanel;