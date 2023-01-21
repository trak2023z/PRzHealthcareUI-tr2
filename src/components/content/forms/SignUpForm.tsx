import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockOutlinedIcon  from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { RegisterData } from '../../../api/ApiAccount';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';

interface SignUpFormProps {
}

const SignUpForm: React.FC<SignUpFormProps> = () => {
    let navigate = useNavigate();
    const theme = createTheme();

    const signUpSchema = yup.object().shape({
        login: yup.string().required(),
        password: yup.string().required(),
        firstname: yup.string().required(),
        secondname: yup.string().nullable(),
        photoBinare: yup.string().nullable(),
        lastname: yup.string().required(),
        dateOfBirth: yup.date().required(),
        pesel: yup.string().required(),
        email: yup.string().email().required(),
        contactNumber: yup.string().required(),
    })

    const { enqueueSnackbar } = useSnackbar();

    const submitHandler: SubmitHandler<RegisterData> = (data: RegisterData) => {

    }
    
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterData>({ resolver: yupResolver(signUpSchema)});
    return <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(submitHandler)} className="form">
        <br />
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rejestracja
          </Typography>
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
            <section>
                <Controller name="login" control={control} render={({ field }) => (
                    <TextField {...field} label="Login" required fullWidth variant="outlined" error={!!errors.login}
                        helperText={errors.login ? errors.login?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="password"  control={control} render={({ field }) => (
                    <TextField {...field} type="password" required label="Hasło" fullWidth variant="outlined" error={!!errors.password}
                        helperText={errors.password ? errors.password?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="firstname" control={control} render={({ field }) => (
                    <TextField {...field} label="Imię" required fullWidth variant="outlined" error={!!errors.firstname}
                        helperText={errors.firstname ? errors.firstname?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="secondname" control={control} render={({ field }) => (
                    <TextField {...field} label="Drugie imię" fullWidth variant="outlined" error={!!errors.secondname}
                        helperText={errors.secondname ? errors.secondname?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="lastname" control={control} render={({ field }) => (
                    <TextField {...field} label="Nazwisko" required fullWidth variant="outlined" error={!!errors.lastname}
                        helperText={errors.lastname ? errors.lastname?.message : ''} />
                )} />
            </section>
            <section>
                <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { ...field }}) => (
                    <DatePicker
                    {...field}
                    openTo="year"
                        views={['year', 'month', 'day']}
                    label="Data urodzenia"
                    renderInput={(inputProps) => (
                        <TextField
                        {...inputProps}
                        required
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth ? errors.dateOfBirth?.message : ''}
                        />
                    )}
                    />
                )}
                />
            </section>
            <section>
                <Controller name="pesel" control={control} render={({ field }) => (
                    <TextField {...field} label="Pesel *" fullWidth variant="outlined" error={!!errors.pesel}
                        helperText={errors.pesel ? errors.pesel?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="email" control={control} render={({ field }) => (
                    <TextField {...field} type="email" label="E-mail" required fullWidth variant="outlined" error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : ''} />
                )} />
            </section>
            <section>
                <Controller name="contactNumber" control={control} render={({ field }) => (
                    <TextField {...field} label="Telefon" required fullWidth variant="outlined" error={!!errors.contactNumber}
                        helperText={errors.contactNumber ? errors.contactNumber?.message : ''} />
                )} />

            </section>
            
            <section></section>
            <section>
                <Stack direction="row" spacing={3}>
                    <Button type="submit"
                        variant="contained"
                        color="success"
                        endIcon={<PersonAddIcon />}>
                        Zarejestruj się!
                    </Button>
                </Stack>
            </section>
            <section></section>
            <section>
                <Link to="/login">
                  Masz już konto? Zaloguj się
                </Link>
                </section>
        </div>
        
    </form>
    </ThemeProvider>

}

export default SignUpForm;