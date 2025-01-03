import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useStore } from '../store'; // Імпорт з іменованого експорту

const AddIcon = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [info, setInfo] = useState('');
  const user = useStore((state) => state.user);

  const handleAddIcon = async () => {
    if (!user) {
      alert('Ви повинні бути зареєстровані для додавання іконок.');
      return;
    }

    try {
      await addDoc(collection(db, 'icons'), {
        name,
        number,
        cabinet,
        info,
        userId: user.uid,
      });
      setName('');
      setNumber('');
      setCabinet('');
      setInfo('');
      alert('Ікону додано успішно!');
    } catch (error) {
      console.error('Помилка при додаванні ікони: ', error);
      alert('Сталася помилка при додаванні ікони.');
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
        <Button variant="contained" color="primary" onClick={handleAddIcon}>
          Додати ікону
        </Button>
      </Box>
    </Container>
  );
};

export default AddIcon;