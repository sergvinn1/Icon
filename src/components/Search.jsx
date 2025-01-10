import { useState, useEffect, useCallback } from 'react';
import { Container, TextField, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import IconCard from './IconCard';

const Search = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    if (name.length < 3 && number.length < 3) {
      setResults([]);
      return;
    }

    const iconsCollection = collection(db, 'icons');
    let queries = [];

    // Пошук за назвою
    if (name.length >= 3) {
      const nameWords = name.toLowerCase().split(/\s+/).filter(word => word.length >= 3);
      if (nameWords.length > 0) {
        const nameQuery = query(iconsCollection, where('keywords', 'array-contains-any', nameWords));
        queries.push(nameQuery);
      }
    }

    // Пошук за номером
    if (number.length >= 3) {
      const numberQuery = query(iconsCollection, where('number', '>=', number), where('number', '<=', number + '\uf8ff'));
      queries.push(numberQuery);
    }

    const results = [];
    for (const q of queries) {
      const iconSnapshot = await getDocs(q);
      const iconList = iconSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      results.push(...iconList);
    }

    // Унікалізація результатів
    const uniqueResults = Array.from(new Set(results.map(a => a.id)))
      .map(id => {
        return results.find(a => a.id === id);
      });

    setResults(uniqueResults);
  }, [name, number]);

  useEffect(() => {
    handleSearch();
  }, [name, number, handleSearch]);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Пошук ікон
        </Typography>
        <TextField
          label="Назва"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Номер"
          variant="outlined"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
        />
      </Box>
      <Grid container spacing={2} marginTop={2}>
        {results.map((icon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={icon.id}>
            <IconCard {...icon} onEdit={() => navigate(`/edit/${icon.id}`)} onDelete={() => {}} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;