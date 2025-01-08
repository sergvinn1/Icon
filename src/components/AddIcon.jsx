import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddIcon = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddIcon = async () => {
    if (!name || !number || !cabinet) {
      toast.error('Будь ласка, заповніть обов\'язкові поля.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'icons'), {
        name,
        number,
        cabinet,
        info,
      });
      setName('');
      setNumber('');
      setCabinet('');
      setInfo('');
      toast.success('Ікону додано успішно!');
      navigate('/');
    } catch (error) {
      console.error('Помилка при додаванні ікони: ', error);
      toast.error('Сталася помилка при додаванні ікони.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Додати нову ікону
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
        <TextField
          label="Додаткова інформація"
          fullWidth
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddIcon} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Додати ікону'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
          Повернутися
        </Button>
      </Box>
    </Container>
  );
};

export default AddIcon;