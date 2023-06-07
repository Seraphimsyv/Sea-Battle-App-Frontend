import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { EnumGameStatus } from "../../enum/game.enum"
import { IStatProps as IProps } from '../../props/game.props';

const StatisticPanel = ({ gameInfo }: IProps) => {
  const statusLst = [EnumGameStatus.InGame, EnumGameStatus.Finish];

  return (
    <>
      <Box sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        {gameInfo && statusLst.includes(gameInfo.info.status) && (
          <>
            {Object.keys(gameInfo.players).map((playerId, key) => (
              <div
                key={key}
                style={{
                  margin: '1em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}
              >
                <Typography>
                  {gameInfo.players[Number(playerId)].userData.username}
                </Typography>
                <Stack spacing={2}>
                  <p>Points: {gameInfo.players[Number(playerId)].point}</p>
                  <p>Remaining ships: {gameInfo.players[Number(playerId)].playground.ship.length}</p>
                  <p>Good shots: {gameInfo.players[Number(playerId)].playground.destroyed.length}</p>
                  <p>Missed shots: {gameInfo.players[Number(playerId)].playground.missed.length}</p>
                </Stack>
              </div>
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default StatisticPanel;