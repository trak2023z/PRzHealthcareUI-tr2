import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EventInformation, getAvailableDays } from '../../../api/ApiEvent';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BlockIcon from '@mui/icons-material/Block';
import { UserData } from '../../../api/ApiAccount';
import { VaccinationInformation } from '../../../api/ApiVaccination';
import { MenuItem } from '@mui/material';

interface EventAddEditFormProps {
  onClose: () => void,
  eventInformation?: EventInformation,
  doctorsList: UserData[],
  vaccinationsList: VaccinationInformation[]
}

const addEventSchema = yup.object().shape({
    vacId: yup.number().required(),
    doctorId: yup.number().required(),
    timeFrom: yup.string().required(),
    dateFrom: yup.date().required(),
})

const EventAddEditForm: React.FC<EventAddEditFormProps> = ({ onClose, eventInformation, doctorsList, vaccinationsList}) => {
  const isEdit = !!eventInformation;

  const [availableDays, setAvailableDays] = useState<EventInformation[]>([]);
  const [selectedDate, setSelectedDate] = useState<String>();
  const [selectedDoctor, setSelectedDoctor] = useState<String>();
  let navigate = useNavigate();
  const theme = createTheme();
  const { enqueueSnackbar } = useSnackbar();

    yup.setLocale({
      mixed: {
          required: 'Pole obowiązkowe',
      },
  });

  useEffect(() => {
    
}, []);

const handleDoctorChanged = (data: String) => {
    if(data != null){
        setSelectedDate(undefined);
        setSelectedDoctor(data);
    }
  }

const handleDateChanged = (data: String) => {
    if(data != null)
    {
        setSelectedDate(data);
        if(selectedDoctor != null && selectedDate != null){
            getAvailableDays(selectedDate, selectedDoctor).then((res) => {
                setAvailableDays(res.data);
                console.log(res.data);
              })
                .catch((error) => {
                  if (error.response.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                  }
                  enqueueSnackbar(error.response.data.message, {
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                    variant: "error",
                    autoHideDuration: 5000
                  });
                });
        }
    }
  };

  const padTo2Digits = (num: string) => {
    return String(num).padStart(2, '0');
  }
  const getFormattedTime = (data: Date) => {
    return padTo2Digits(data.getHours().toString()) + ":" + padTo2Digits(data.getMinutes().toString());
}

    const submitHandler: SubmitHandler<EventInformation> = (data: EventInformation) => {
        console.log(data);
    }
    
    const { control, handleSubmit, formState: { errors } } = useForm<EventInformation>({ resolver: yupResolver(addEventSchema)});
    return <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(submitHandler)}>
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
            <section>
            <Controller name="vacId" control={control} render={({ field }) => (
                    <TextField select
                        label="Szczepionka"
                        {...field}
                        fullWidth
                        error={!!errors.vacId}
                        helperText={errors.vacId ? errors.vacId?.message : ''}>
                        {vaccinationsList.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )} />
            </section>
            <section>
            <Controller name="doctorId" control={control} render={({ field }) => (
                    <TextField select
                        label="Doktor"
                        {...field}
                        fullWidth
                        error={!!errors.doctorId}
                        helperText={errors.doctorId ? errors.doctorId?.message : ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleDoctorChanged(event.target.value);
                          }}>
                        {doctorsList.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.firstname + ' ' + type.lastname}
                            </MenuItem>
                        ))}
                    </TextField>
                )} />
            </section>
            <section>
            <Controller name="dateFrom" control={control} render={({ field }) => (
                    <TextField 
                        id="date"
                        type="date"
                        label="Data"
                        defaultValue={Date.now.toString()}
                        InputLabelProps={{
                            shrink: true,
                          }}
                        {...field}
                        fullWidth
                        error={!!errors.dateFrom}
                        helperText={errors.dateFrom ? errors.dateFrom?.message : ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleDateChanged(event.target.value);
                          }}>
                    </TextField>
                )} />
            </section>
            <section>
            <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} label="Dodatkowe uwagi" multiline fullWidth variant="outlined" error={!!errors.description}/>
                )} />
            </section>
            <section>
            <Controller name="timeFrom" control={control} render={({ field }) => (
                    <TextField select
                        label="Wybierz termin"
                        maxRows={5}
                        {...field}
                        fullWidth
                        error={!!errors.timeFrom}
                        helperText={errors.timeFrom ? errors.timeFrom?.message : ''}>
                        {availableDays.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {getFormattedTime(new Date((type.timeFrom)))}
                            </MenuItem>
                        ))}
                    </TextField>
                )} />
            </section>
            <section>

            </section>
            <section>
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
        </div>
    </form>
    </ThemeProvider>

}

export default EventAddEditForm;