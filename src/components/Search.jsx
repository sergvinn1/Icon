import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import IconCard from '../components/IconCard';

const Search = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const iconsCollection = collection(db, 'icons');
    let q = query(iconsCollection);

    if (name) {
      q = query(q, where('name', '==', name));
    }
    if (number) {
      q = query(q, where('number', '==', number));
    }
    if (cabinet) {
      q = query(q, where('cabinet', '==', cabinet));
    }

    const iconSnapshot = await getDocs(q);
    const iconList = iconSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setResults(iconList);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, justifyContent: 'center' }}>
        <TextField
          label="Назва ікони"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Номер ікони"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <TextField
          label="Номер шафи"
          value={cabinet}
          onChange={(e) => setCabinet(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Пошук
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
          Повернутися
        </Button>
      </Box>
      <Grid container spacing={3}>
        {results.map((icon) => (
          <Grid item xs={12} sm={6} md={4} key={icon.id}>
            <Box sx={{ height: '100%' }}>
              <IconCard {...icon} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;