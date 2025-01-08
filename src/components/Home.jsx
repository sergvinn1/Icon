import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Grid, Collapse, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import IconCard from '../components/IconCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [sortType, setSortType] = useState('name');

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

  return (
    <Container>
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
        Пошук ікон
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
            Пошук іконок
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
            {allCollapsed ? 'Розгорнути всі' : 'Згорнути всі'}
          </Button>
        </Box>
        <FormControl sx={{ minWidth: 120, width: '100%', maxWidth: { sm: 'auto' } }}>
          <InputLabel>Сортувати за</InputLabel>
          <Select value={sortType} onChange={handleSortChange} fullWidth={true}>
            <MenuItem value="name">Назвою</MenuItem>
            <MenuItem value="number">Номером ікони</MenuItem>
            <MenuItem value="cabinet">Шафою</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Collapse in={!allCollapsed}>
        <Grid container spacing={3}>
          {sortIcons(icons, sortType).map((icon) => (
            <Grid item xs={12} sm={6} md={4} key={icon.id}>
              <Box sx={{ height: '100%' }}>
                <IconCard {...icon} expanded={!allCollapsed} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Container>
  );
};

export default Home;