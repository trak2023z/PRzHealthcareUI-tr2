import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { changePassword, ChangePasswordData } from '../../../api/ApiAccount';
import KeyIcon from '@mui/icons-material/Key';

const ChangePasswordForm: React.FC = () => {
    let navigate = useNavigate();
    const changePasswordSchema = yup.object().shape({
        oldPassword: yup.string().required('Pole obowiązkowe'),
        newPassword: yup.string().required('Pole obowiązkowe'),
        newPasswordRepeat: yup.string().required('Pole obowiązkowe').oneOf([yup.ref('newPassword'), null], 'Hasła muszą być zgodne'),
    })

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitHandler: SubmitHandler<ChangePasswordData> = (data: ChangePasswordData) => {
        changePassword(data)
                .then(() => {
                    enqueueSnackbar('Zmiany zostały wprowadzone.', {
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                        variant: "info",
                        autoHideDuration: 5000,
                        onClick: () => closeSnackbar()
                    });
                })
                .catch((error: any) => {
                    if (error.response.status === 401) {
                        localStorage.clear();
                        navigate('/login');
                    }
                    enqueueSnackbar(error.response.data.message, {
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                        variant: "error",
                        autoHideDuration: 5000,
                        onClick: () => closeSnackbar()
                    });
                });
    }

    const { control, handleSubmit, formState: { errors } } = useForm<ChangePasswordData>({ resolver: yupResolver(changePasswordSchema)});
    return <form onSubmit={handleSubmit(submitHandler)} className="form">
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
            <section>
                <Controller name="oldPassword" control={control} render={({ field }) => (
                    <TextField {...field} type="password" label="Aktualne hasło" variant="outlined" error={!!errors.oldPassword}
                        helperText={errors.oldPassword ? errors.oldPassword?.message : ''} />
                )} />
            </section>
            <section>
            </section>
            <section>
                <Controller name="newPassword" control={control} render={({ field }) => (
                    <TextField {...field} type="password" label="Nowe hasło" variant="outlined" error={!!errors.newPassword}
                        helperText={errors.newPassword ? errors.newPassword?.message : ''} />
                )} />
            </section>
            <section>
            </section>
            <section>
                <Controller name="newPasswordRepeat" control={control} render={({ field }) => (
                    <TextField {...field} type="password" label="Powtórz hasło" variant="outlined" error={!!errors.newPasswordRepeat}
                        helperText={errors.newPasswordRepeat ? errors.newPasswordRepeat?.message : ''} />
                )} />
            </section>
            <section></section>
            <section>
                <Stack direction="row" spacing={3}>
                    <Button type="submit"
                        variant="contained"
                        color="success"
                        endIcon={<KeyIcon />}>
                        Zmień hasło
                    </Button>
                </Stack>
            </section>
        </div>
    </form>

}

export default ChangePasswordForm;