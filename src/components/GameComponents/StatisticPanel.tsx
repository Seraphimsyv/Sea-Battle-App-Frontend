import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { EnumGameStatus } from "../../enum/game.enum"
import { IStatProps as IProps } from '../../props/game.props';

const StatisticPanel = ({ gameInfo, playerId }: IProps) => {
  const statusLst = [EnumGameStatus.InGame, EnumGameStatus.Finish];
  const playersIds = Object.keys(gameInfo.players);
  const opponentId = playersIds[0] === String(playerId)
    ? Number(playersIds[1])
    : Number(playersIds[0]);

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
            {Object.keys(gameInfo.players).map((id, key) => (
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
                  {gameInfo.players[Number(id)].userData.username}
                </Typography>
                <Stack spacing={2}>
                  <p>Points: {gameInfo.players[Number(id)].point}</p>
                  <p>Remaining ships: {gameInfo.players[Number(id)].playground.ship.length}</p>
                  <p>Good shots: {gameInfo.players[Number(id) === playerId ? opponentId : playerId].playground.destroyed.length}</p>
                  <p>Missed shots: {gameInfo.players[Number(id) === playerId ? opponentId : playerId].playground.missed.length}</p>
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