import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UseAuthenticatedUser = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  let navigate = useNavigate();

  useEffect(() => {
    const newToken = localStorage.getItem('token');
    setIsAuthenticated(!!newToken);
    setToken(newToken);
  }, [localStorage.getItem('token')]);

  const logout = () => {
    console.log('Logging out');
    localStorage.clear();
    navigate('/login');
  };

  return {
    isAuthenticated: isAuthenticated,
    logout
  };
};
