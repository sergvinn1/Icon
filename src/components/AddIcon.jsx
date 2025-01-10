import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { generateKeywords } from '../generateKeywords'; // Імпортуємо функцію
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddIcon = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keywords = generateKeywords(name); // Генеруємо ключові слова
    console.log('Generated Keywords:', keywords); // Додаємо лог для перевірки ключових слів
    try {
      await addDoc(collection(db, 'icons'), {
        name,
        number,
        cabinet,
        keywords, // Додаємо ключові слова до документа
      });
      toast.success('Ікону успішно додано!');
      setName('');
      setNumber('');
      setCabinet('');
    } catch (error) {
      console.error('Помилка при додаванні документа:', error);
      toast.error('Помилка при додаванні ікони.');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Додати ікону
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Назва"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Шафа"
            value={cabinet}
            onChange={(e) => setCabinet(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Додати
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddIcon;