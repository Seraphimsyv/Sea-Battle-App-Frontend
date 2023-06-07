import {
  useState,
  useEffect
} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountService from '../../service/account-service';
import {
  Profile as AccountProfile
} from '../../types/account.types';

const HeaderComponent = () => {
  const [token] = useState(localStorage.getItem('token') || undefined);
  const [profile, setProfile] = useState<AccountProfile | null>(null);

  useEffect(() => {
    if (token && profile === null) {
      AccountService.loadProfile(token)
      .then(res => setProfile(res));
    }
  })

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          {profile && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Typography component='h3'>
                {profile.username}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HeaderComponent;