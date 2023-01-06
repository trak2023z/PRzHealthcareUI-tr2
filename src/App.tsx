import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import NotFound from './components/content/NotFound';
import SignIn from './components/content/SingIn';

function App() {
  return (
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
              <Route path="/*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
  );
}
export default App;
