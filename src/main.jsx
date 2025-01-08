import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './main.css'

// Отримуємо root елемент
const container = document.getElementById('root');

// Створюємо root за допомогою createRoot
const root = createRoot(container);

// Рендеримо додаток у root
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);