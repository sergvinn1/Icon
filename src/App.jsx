
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddIcon from './components/AddIcon';
import Search from './components/Search';
import EditIcon from './components/EditIcon';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-icon" element={<AddIcon />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit/:id" element={<EditIcon />} />
      </Routes>
    </Router>
  );
};

export default App;