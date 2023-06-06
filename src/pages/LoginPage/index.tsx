import { 
  useState,
  useEffect,
  useContext
} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import AuthComponent from '../../components/AuthComponent';
import { AuthService } from '../../service/auth-service';
import { AlertContext } from '../../manager/alert-manager';
import { ILoginProps } from '../../props/auth.props';
import { EnumAlertType } from '../../enum/main.enum';
import { ErrorAlertText } from '../../constants';

const LoginPage = ({ handleSave }: ILoginProps) => {
  const { addAlert } = useContext(AlertContext);
  const [login, setLogin] = useState('');
  const [loginValid, setLoginValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passValid, setPassValid] = useState(true);
  /**
   * User input save handler for login field
   * @param evt 
   */
  const handleChangeLogin = (evt: any) : void => {
    setLoginValid(true);
    setLogin(evt.currentTarget.value);
  }
  /**
   * User input save handler for password field
   * @param evt 
   */
  const handleChangePassword = (evt: any) : void => {
    setPassValid(true);
    setPassword(evt.currentTarget.value);
  }
  /**
   * User authorization handler
   */
  const handleAuth = () => {
    if (login.length === 0 || password.length === 0) {
      setLoginValid(false);
      setPassValid(false);
      addAlert(EnumAlertType.error, ErrorAlertText.auth.login.empty);
      return;
    }

    AuthService.logIn({ login, password })
    .then((token: string) => {
      handleSave(token);
    })
    .catch((err: string) => {
      if (err === 'ERROR:PASSWORD') {
        setLoginValid(true);
        setPassValid(false);
        addAlert(EnumAlertType.error, ErrorAlertText.auth.login.password);
      } else {
        setLoginValid(false);
        setPassValid(false);
        addAlert(EnumAlertType.error, ErrorAlertText.auth.login.invalid);
      }
    })
  }
  /**
   * 
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleAuth();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })

  return (
    <>
      <AuthComponent title='Log-in'>
        <TextField
          required
          fullWidth
          autoFocus
          margin="normal"
          id="login"
          label="Login"
          error={!loginValid}
          onChange={handleChangeLogin}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          error={!passValid}
          onChange={handleChangePassword}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAuth}
        >
          Log In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/sign-in" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </AuthComponent>
    </>
  )
}

export default LoginPage;