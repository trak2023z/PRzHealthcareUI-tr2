import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { UseAuthenticatedUser } from '../../hooks/UseAuthenticatedUser';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginAccount, LoginData } from '../../api/ApiAccount';
import { loginSchema } from '../../validators/accountValidator';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { postResetPasswordNotification } from '../../api/ApiNotification';
import { SetStateAction, useState } from 'react';


export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated } = UseAuthenticatedUser();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  const [reminderEmail, setReminderEmail] = useState('');
  const [showReminderEmail, setShowReminderEmail] = useState(false);
  let navigate = useNavigate();
  const handleSetReminderEmail = (event: { target: { value: SetStateAction<string>; }; }) => {
    setReminderEmail(event.target.value);
  };

  const handleLogin = (data: LoginData) => {
    loginAccount(data).then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('login', res.data.login);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('atyId', res.data.atyId.toString());
        navigate('/');
    })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
          autoHideDuration: 5000
        });
      });
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://lorempokemon.fakerapi.it/pokemon)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              autoComplete="login"
              autoFocus
              error={!!errors?.login}
              {...register('login')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Hasło"
              type="password"
              id="password"
              error={!!errors?.password}
              autoComplete="current-password"
              {...register('password')}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>

            <Grid container>
            <Grid item xs>
                <Button variant="contained" color="secondary" onClick={() => {setShowReminderEmail(true)}}>
                  Zapomniałeś hasła?
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" >
                <Link to="/register" style={{ textDecoration: 'none', color:'white' }}>
                  {'Zarejestruj się'}
                </Link>
                </Button>
              </Grid>
              {showReminderEmail && (<Grid container md={12}>
              <Grid item md={12}>
                  <TextField
                margin="normal"
                fullWidth
                label="Podaj adres e-mail"
                onChange={handleSetReminderEmail}
                value={reminderEmail}
                type="email"
              />
              </Grid>
              <Grid item md={12}>
                <Button onClick={() => {
                  postResetPasswordNotification({reminderEmail})
                  .then(() => {
                    enqueueSnackbar("Jeżeli adres jest w bazie danych, wiadomość zostanie wysłana.", {
                      anchorOrigin: { vertical: "bottom", horizontal: "left" },
                      variant: 'info',
                      autoHideDuration: 8000
                    });
                  })
                  .catch((error) => {
                    enqueueSnackbar(error.response.data.message, {
                      anchorOrigin: { vertical: "bottom", horizontal: "left" },
                      variant: "error",
                      autoHideDuration: 4000
                    });
                  });
                }}
                variant="contained"
                color="secondary"
                fullWidth>
                  Przypomnij hasło
                </Button>
              </Grid>
            </Grid>)}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
