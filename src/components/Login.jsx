import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { useStore } from '../store'; // Імпорт з іменованого експорту

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/');
    } catch (error) {
      console.error('Помилка при вході: ', error);
      alert('Сталася помилка при вході.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Вхід
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={handleLogin}
      >
        Увійти за допомогою Google
      </Button>
    </Container>
  );
};

export default Login;