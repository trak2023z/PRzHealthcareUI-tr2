import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import NotFound from './components/content/NotFound';
import SignIn from './components/content/SignIn';
import SignUp from './components/content/SignUp';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { plPL } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pl';
import ClientDashboardContent from "./components/content/dashboard/ClientDashboard";
import MailConfirmed from "./components/content/MailConfirmed";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl" localeText={plPL.components.MuiLocalizationProvider.defaultProps.localeText}>
    <SnackbarProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>}
              >
                <Route path="/" element={<MainSite />} />
                <Route path="/clients" element={<Clients />} />
              </Route>
              
              {/* <Route path="/*" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } /> */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/account/confirm-mail" element={<MailConfirmed />} />
              <Route path="/" element={<ClientDashboardContent />} />
              <Route path="/*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
    </LocalizationProvider>
  );
}
export default App;
