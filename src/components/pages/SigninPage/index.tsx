import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  /**
   * User input save handler for username field
   * @param evt 
   */
  const handleChangeUsername = (evt: any) : void => {
    setUsername(evt.currentTarget.value);
  }
  /**
   * User input save handler for login field
   * @param evt 
   */
  const handleChangeLogin = (evt: any) : void => {
    setLogin(evt.currentTarget.value);
  }
  /**
   * User input save handler for password field
   * @param evt 
   */
  const handleChangePassword = (evt: any) : void => {
    setPassword(evt.currentTarget.value);
  }
  /**
   * User registration handler
   */
  const handleRegistartion = () => {
    fetch('/api/auth/sign-in', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, login: login, password: password })
    })
    .then(res => res.json())
    .then(res => {
      if (res?.statusCode) {
        console.log(res)
      } else {
        window.location.href = '/log-in';
      }
    })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              onChange={handleChangeUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              autoFocus
              onChange={handleChangeLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangePassword}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegistartion}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/log-in" variant="body2">
                  {"Already have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}