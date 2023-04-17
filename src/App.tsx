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
import UserProfileSettings from "./components/content/UserProfileSettings";
import Dashboard from "./components/content/dashboard/Dashboard";
import NurseDashboardContent from "./components/content/dashboard/NurseDashboard";
import { useState } from "react";
import { registerLicense } from '@syncfusion/ej2-base';

function App() {
  const [admin, setAdmin] = useState(localStorage.getItem("login")==="Administrator"?true:null);
  registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlliSX5XdERnWndccXY=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpSdkVnW35ac3xWQ2I=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0VjXX1fdHddQ2Je;MTY2ODUyNEAzMjMxMmUzMTJlMzMzNVBJQmt4c2VWWnp1QlpGaTBVWWRaWGo3YTVhdmhnNnd2MkQ5WGZiSExUN2M9;MTY2ODUyNUAzMjMxMmUzMTJlMzMzNWNQbEtrQTNzSENyYTZsbEtoMmV3bnNsOE1vNjRuamlnYldORjd4NzFMbzQ9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckRjWXtccXBWT2JVUw==;MTY2ODUyN0AzMjMxMmUzMTJlMzMzNUJiOU9RejA2Y01sRThxZ3NXVm15OWVHM3Q3RlBaRlVYbkhuQmJETDVRbnM9;MTY2ODUyOEAzMjMxMmUzMTJlMzMzNUpwd0hPaHMzNzNtM0pGVGxnWmZkS0VlS2FaeTN4ZFdwVnZhWEdVMTZYVjA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0VjXX1fdHBVRmBe;MTY2ODUzMEAzMjMxMmUzMTJlMzMzNWlOd1paN1lnU21DNzFWeTMxS1dUdklURkJ1UW9vRk9Ob3RSWitxZVo3aFE9;MTY2ODUzMUAzMjMxMmUzMTJlMzMzNUp5ZDJuaHI4a3JlMXFvSzdSQnZsdVprd3NGaEVEMkJINkZiYkQ5WVhLdUE9;MTY2ODUzMkAzMjMxMmUzMTJlMzMzNUJiOU9RejA2Y01sRThxZ3NXVm15OWVHM3Q3RlBaRlVYbkhuQmJETDVRbnM9');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl" localeText={plPL.components.MuiLocalizationProvider.defaultProps.localeText}>
    <SnackbarProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>}
              >
                <Route path="/" element={admin ? <NurseDashboardContent /> : <ClientDashboardContent />} />
                <Route path="/usersettings" element={<UserProfileSettings />} />
                </Route>

              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/account/confirm-mail" element={<MailConfirmed />} />
              <Route path="/*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
    </LocalizationProvider>
  );
}
export default App;
