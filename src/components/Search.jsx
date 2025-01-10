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
      const nameWords = name.toLowerCase().split(' ').filter(word => word.length >= 3);
      nameWords.forEach(word => {
        const nameQuery = query(iconsCollection, where('keywords', 'array-contains', word));
        queries.push(nameQuery);
      });
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

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete icon with id ${id}`);
  };

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
        />
        <TextField
          label="Номер"
          variant="outlined"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        {results.length === 1 ? (
          <Box sx={{ width: '100%' }}>
            <IconCard
              id={results[0].id}
              name={results[0].name}
              number={results[0].number}
              cabinet={results[0].cabinet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {results.map((icon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={icon.id}>
                <IconCard
                  id={icon.id}
                  name={icon.name}
                  number={icon.number}
                  cabinet={icon.cabinet}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Search;