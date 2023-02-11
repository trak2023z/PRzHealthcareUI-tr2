import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EventInformation } from '../../../api/ApiEvent';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BlockIcon from '@mui/icons-material/Block';

interface EventAddEditFormProps {
  onClose: () => void,
  eventInformation?: EventInformation,
}

const EventAddEditForm: React.FC<EventAddEditFormProps> = ({ onClose, eventInformation}) => {
  const isEdit = !!eventInformation;
  let navigate = useNavigate();
  const theme = createTheme();
  const { enqueueSnackbar } = useSnackbar();

    yup.setLocale({
      mixed: {
          required: 'Pole obowiązkowe',
      },
  });

  useEffect(() => {
    window.addEventListener('keypress', e => {
        if (e.key === 'Escape') {
            onClose();
        }
    });
}, []);

    const submitHandler: SubmitHandler<EventInformation> = (data: EventInformation) => {
        console.log(data);
    }
    
    const { control, handleSubmit, formState: { errors } } = useForm<EventInformation>(); //{ resolver: yupResolver(signUpSchema)}
    return <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(submitHandler)}>
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
            <section>
            <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} disabled={true} label="Opis" multiline fullWidth variant="outlined" error={!!errors.description}/>
                )} />
            </section>
            <section>
            <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} disabled={true} label="Opis" multiline fullWidth variant="outlined" error={!!errors.description}/>
                )} />
            </section>
            <section>
            <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} disabled={true} label="Opis" multiline fullWidth variant="outlined" error={!!errors.description}/>
                )} />
                <Stack direction="row" spacing={3} my={3}>
                    <Button type="submit"
                        variant="contained"
                        color="success"
                        endIcon={isEdit ? (<> <SaveAsIcon /></>) : (<><PostAddIcon /></>)}>
                        {isEdit ? "Zapisz zmiany" : "Dodaj wpis"}
                    </Button>
                    <Button onClick={onClose}
                        variant="contained"
                        color="error"
                        endIcon={<BlockIcon />}>Zamknij</Button>
                </Stack>
            </section>
            <section>
            <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} disabled={true} label="Opis" multiline fullWidth variant="outlined" error={!!errors.description}/>
                )} />
            </section>
            <section>

            </section>
        </div>
    </form>
    </ThemeProvider>

}

export default EventAddEditForm;