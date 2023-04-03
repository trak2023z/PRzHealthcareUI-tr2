import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { LoginData } from '../../api/ApiAccount';
import ChangePasswordForm from '../content/forms/ChangePasswordForm';
import SaveAsIcon from '@mui/icons-material/SaveAs';
// import { FileUpload } from './content/FileUpload';

function UserProfileSettings() {
    let navigate = useNavigate();
    return (
        <Grid container spacing={2} style={{textAlign:'left'}}>
            <Grid item xs={12} marginLeft={5} marginTop={8}>
                <Typography><h2>Zmiana hasła</h2></Typography>
                <hr />
                <ChangePasswordForm/>
            </Grid>
        </Grid>
    );
}

export default UserProfileSettings;