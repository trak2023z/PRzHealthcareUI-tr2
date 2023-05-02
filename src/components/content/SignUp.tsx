import { UseAuthenticatedUser } from '../../hooks/UseAuthenticatedUser';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './forms/SignUpForm';
import { Container } from '@mui/material';
import prz_logo from "../../assets/prz_logo.png";

export default function SignIn() {
  const { isAuthenticated } = UseAuthenticatedUser();
  let navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <Container>
      <SignUpForm/>
    </Container>
  );
}
