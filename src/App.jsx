import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import AddIcon from './components/AddIcon';
import Login from './components/Login';
import { useStore } from './store'; // Імпорт з іменованого експорту

const PrivateRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add-icon" element={<PrivateRoute><AddIcon /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;