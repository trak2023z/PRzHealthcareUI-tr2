import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from '../Header';
import Copyright from '../Copyright';
import { Button, Dialog, DialogContent, Typography } from '@mui/material';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { addLocale, locale } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import EventAddEditForm from '../forms/EventAddEditForm';
import { getDoctors, UserData } from '../../../api/ApiAccount';
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router';
import { getVaccinationList, VaccinationInformation } from '../../../api/ApiVaccination';

export default function ClientDashboardContent() {
  const [openAddEditEventDialog, setOpenAddEditEventDialog] = useState(false);
  const [doctorsList, setDoctorsList] = useState<UserData[]>([]);
  const [vaccinationList, setVaccinationList] = useState<VaccinationInformation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | undefined | null | string>(undefined);
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseAddEditEventDialog = () => {
    setOpenAddEditEventDialog(false);
  }

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctorsList(res.data);
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
    getVaccinationList().then((res) => {
      setVaccinationList(res.data);
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
    
  },[]
  );

  addLocale('pl', {
    firstDayOfWeek: 1,
    dayNames: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
    dayNamesShort: ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nd'],
    dayNamesMin: ['P', 'W', 'S', 'C', 'Pt', 'S', 'N'],
    monthNames: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
    monthNamesShort: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paz', 'lis', 'gru'],
    today: 'Dziś',
    clear: 'Wyczyść'
    });
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month - 1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);
  locale('pl');

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header/>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "6vh",
                  }}
                >
                  <Typography align='center'>Twoje zaplanowane wizyty</Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography align='center'>Brak zaplanowanych wizyt</Typography>
                  <br/>
                  <Button variant="contained"
                    onClick={() => {
                      setOpenAddEditEventDialog(true);
                    }}>Zaplanuj wizytę</Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                <Calendar value={selectedDate} 
                  dateFormat="dd/mm/yyyy"
                  onChange={(e) => {
                    return setSelectedDate(e.value);
                  }} inline showWeek />
                </Paper>
              </Grid>
              
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
        <Dialog
        open={openAddEditEventDialog}
        onClose={handleCloseAddEditEventDialog}
        fullScreen>
        <DialogContent>
          <EventAddEditForm onClose={handleCloseAddEditEventDialog} doctorsList={doctorsList} vaccinationsList={vaccinationList}/>
        </DialogContent>
      </Dialog>
      </Box>
  );
}