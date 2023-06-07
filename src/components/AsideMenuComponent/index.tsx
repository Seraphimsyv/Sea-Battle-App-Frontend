import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CableIcon from '@mui/icons-material/Cable';
import TuneIcon from '@mui/icons-material/Tune';
import { IAsideProps } from '../../props/main.props';
import { EnumHomeWindow } from '../../enum/main.enum';

const AsideMenuComponent = (props: IAsideProps) => {
  return (
    <>
      <Stack
        direction='column'
        spacing={2}
      >
        <Button 
          variant={props.currentWindow === EnumHomeWindow.Creation ? "contained" : "outlined"}
          startIcon={<SportsEsportsIcon />}
          onClick={() => props.callbackChangeWindow(EnumHomeWindow.Creation)}
        >
          Create
        </Button>
        <Button
          variant={props.currentWindow === EnumHomeWindow.GameList ? "contained" : "outlined"}
          startIcon={<CableIcon />}
          onClick={() => props.callbackChangeWindow(EnumHomeWindow.GameList)}
        >
          Games List
        </Button>
        <Button
          variant={props.currentWindow === EnumHomeWindow.Statistic ? "contained" : "outlined"}
          startIcon={<LeaderboardIcon />}
          onClick={() => props.callbackChangeWindow(EnumHomeWindow.Statistic)}
        >
          Statistic board
        </Button>
        <Button 
          variant='outlined'
          startIcon={<LogoutIcon />}
          onClick={() => {
            localStorage.clear();
              window.location.href = '/';
          }}
        >
          Log-out
        </Button>
      </Stack>
    </>
  )
}

export default AsideMenuComponent;