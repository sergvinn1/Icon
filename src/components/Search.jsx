import { useState } from 'react';
import { Container, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import IconCard from './IconCard';

const Search = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (name.length < 3 && number.length < 3 && cabinet.length < 3) {
      return;
    }

    const iconsCollection = collection(db, 'icons');
    let q = query(iconsCollection);

    if (name.length >= 3) {
      q = query(q, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
    }
    if (number.length >= 3) {
      q = query(q, where('number', '>=', number), where('number', '<=', number + '\uf8ff'));
    }
    if (cabinet.length >= 3) {
      q = query(q, where('cabinet', '>=', cabinet), where('cabinet', '<=', cabinet + '\uf8ff'));
    }

    const iconSnapshot = await getDocs(q);
    const iconList = iconSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setResults(iconList);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 3, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
          <TextField
            label="Назва ікони"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Номер ікони"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
          />
          <TextField
            label="Номер шафи"
            value={cabinet}
            onChange={(e) => setCabinet(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Пошук
          </Button>
        </Box>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/')} fullWidth>
          Повернутися
        </Button>
      </Box>
      <Grid container spacing={3}>
        {results.map((icon) => (
          <Grid item xs={12} sm={6} md={4} key={icon.id}>
            <Box sx={{ height: '100%' }}>
              <IconCard 
                id={icon.id}
                name={icon.name}
                number={icon.number}
                cabinet={icon.cabinet}
                expanded={true} // Відображаємо повну картку при пошуку
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;