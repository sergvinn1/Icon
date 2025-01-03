import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Search = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');

  const handleSearch = () => {
    // Add search logic here
    console.log({ name, number, cabinet });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Пошук іконок
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Назва ікони"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Номер ікони"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <TextField
          label="Номер шафи"
          fullWidth
          value={cabinet}
          onChange={(e) => setCabinet(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </Container>
  );
};

export default Search;