import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditIcon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconData, setIconData] = useState({
    name: '',
    number: '',
    cabinet: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIconData = async () => {
      try {
        const docRef = doc(db, 'icons', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIconData(docSnap.data());
        } else {
          console.log('Документ не знайдено!');
        }
      } catch (error) {
        console.error('Помилка при отриманні документа:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIconData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIconData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'icons', id);
      await updateDoc(docRef, iconData);
      toast.success('Ікону успішно оновлено!', {
        onClose: () => navigate('/search')
      });
    } catch (error) {
      console.error('Помилка при оновленні документа:', error);
    }
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <Container>
      <ToastContainer />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Редагувати Ікону
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Назва"
            name="name"
            value={iconData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер"
            name="number"
            value={iconData.number}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Шафа"
            name="cabinet"
            value={iconData.cabinet}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Зберегти
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditIcon;