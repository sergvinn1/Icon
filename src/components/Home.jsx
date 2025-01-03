import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Ласкаво просимо до додатку іконок
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => navigate('/search')}
        >
          Пошук іконок
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LoginIcon />}
          onClick={() => navigate('/login')}
        >
          Вхід / Реєстрація
        </Button>
      </Box>
    </Container>
  );
};

export default Home;