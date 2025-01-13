import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Grid, Collapse, MenuItem, Select, FormControl, InputLabel, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconCard from './IconCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [sortType, setSortType] = useState('number');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState({ id: '', name: '', number: '', cabinet: '' });
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const fetchIcons = async () => {
      const iconsCollection = collection(db, 'icons');
      const iconSnapshot = await getDocs(iconsCollection);
      const iconList = iconSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIcons(iconList);
    };

    fetchIcons();
  }, []);

  const handleToggleAll = () => {
    setAllCollapsed(!allCollapsed);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const sortIcons = (icons, type) => {
    return [...icons].sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  };

  const handleEdit = (icon) => {
    setCurrentIcon(icon);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'icons', id));
      setIcons(icons.filter(icon => icon.id !== id));
      toast.success('Ікону видалено успішно');
    } catch {
      toast.error('Помилка при видаленні ікони');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentIcon(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await updateDoc(doc(db, 'icons', currentIcon.id), currentIcon);
      setIcons(icons.map(icon => (icon.id === currentIcon.id ? currentIcon : icon)));
      toast.success('Ікону оновлено успішно');
      setIsEditDialogOpen(false);
    } catch {
      toast.error('Помилка при оновленні ікони');
    }
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  return (
    <Container
      sx={{
        backgroundImage: 'url(https://example.com/your-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <ToastContainer />
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Ікони
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
            fullWidth={true}
            sx={{ maxWidth: { sm: 'auto' } }}
          >
            Пошук ікон
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add-icon')}
            fullWidth={true}
            sx={{ maxWidth: { sm: 'auto' } }}
          >
            Додати ікону
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={handleToggleAll}
            fullWidth={true}
            sx={{ maxWidth: { sm: 'auto' } }}
          >
            {allCollapsed ? 'Розгорнути' : 'Згорнути'}
          </Button>
        </Box>
        <FormControl fullWidth variant="filled">
          <InputLabel>Сортувати за</InputLabel>
          <Select value={sortType} onChange={handleSortChange} fullWidth={true}>
            <MenuItem value="name">Назвою</MenuItem>
            <MenuItem value="number">Номером ікони</MenuItem>
            <MenuItem value="cabinet">Шафою</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Collapse in={!allCollapsed}>
        <Grid container spacing={3} sx={{ marginBottom: '24px' }}>
          {sortIcons(icons, sortType).map((icon) => (
            <Grid item xs={12} sm={6} md={4} key={icon.id}>
              <Box sx={{ height: '100%' }}>
                <IconCard 
                  id={icon.id}
                  name={icon.name}
                  number={icon.number}
                  cabinet={icon.cabinet}
                  onEdit={() => handleEdit(icon)}
                  onDelete={() => handleDelete(icon.id)}
                  expanded={!allCollapsed} 
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Collapse>
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Редагувати ікону</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Назва ікони"
              name="name"
              value={currentIcon.name}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Номер ікони"
              name="number"
              value={currentIcon.number}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Номер шафи"
              name="cabinet"
              value={currentIcon.cabinet}
              onChange={handleEditChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Скасувати
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
      {showScroll && (
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollTop}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Container>
  );
};

export default Home;