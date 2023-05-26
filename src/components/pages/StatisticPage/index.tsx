import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReplyIcon from '@mui/icons-material/Reply';

type PlayerStatistic = {
  total: number,
  points: number,
  win: number,
  lose: number
};

type SavedGame = {
  winnerPlayer: string,
  loserPlayer: string,
  winnerPoints: number,
  loserPoints: number,
  steps: number,
  createdAt: Date,
  finishedAt: Date
};

type HistoryGames = SavedGame[];

export const StatisticPage = () => {
  const [token] = useState(localStorage.getItem('token') || undefined);
  const [playerStat, setPlayerStat] = useState<PlayerStatistic | undefined>(undefined);
  const [gamesHistory, setHistory] = useState<HistoryGames>([]);

  useEffect(() => {
    if (token !== undefined) {
      fetch('/api/game/statistic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token })
      })
      .then(res => res.json())
      .then(res => {
        setHistory(res.history);
        setPlayerStat(res.playerStatistic);
      });
    }
  }, [token])

  console.log(playerStat);
  console.log(gamesHistory);

  return (
    <>
      <AppBar>
        <Button
          variant='contained'
          startIcon={<ReplyIcon />}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Back to Home
        </Button>
      </AppBar>
      {playerStat ? (
        <>
          <AppBar sx={{ width: '90%', margin: '2em', marginTop: '3em', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', left: 'auto', right: 'auto' }}>
            <h3>Total games - {playerStat.total}</h3>
            <h3>Total points - {playerStat.points}</h3>
            <h3>Win - {playerStat.win}</h3>
            <h3>Lose - {playerStat.lose}</h3>
          </AppBar>
        </>
      ) : <></>}
      {gamesHistory ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ marginTop: '7.5em', minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Winner</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Loser</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Steps</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Finished At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamesHistory.map((history, key) => (
                  <TableRow
                    key={key}
                  >
                    <TableCell>{history.winnerPlayer}</TableCell>
                    <TableCell>{history.winnerPoints}</TableCell>
                    <TableCell>{history.loserPlayer}</TableCell>
                    <TableCell>{history.loserPoints}</TableCell>
                    <TableCell>{history.steps}</TableCell>
                    <TableCell>{history.createdAt.toString()}</TableCell>
                    <TableCell>{history.finishedAt.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : <></>}
    </>
  )
}