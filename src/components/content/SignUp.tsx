import Grid from '@mui/material/Grid';
import { UseAuthenticatedUser } from '../../hooks/UseAuthenticatedUser';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './forms/SignUpForm';
import { Container } from '@mui/material';

export default function SignIn() {
  const { isAuthenticated } = UseAuthenticatedUser();
  let navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <Container  sx={{ height: '100vh' }}>
      <SignUpForm/>
    </Container>
  );
}
