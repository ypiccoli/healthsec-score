import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles.css';
import { App } from './App';

const tema = createTheme({
  primaryColor: 'healthsec',
  colors: {
    healthsec: [
      '#e5f4f4',
      '#cde8e8',
      '#9bd0d0',
      '#66b6b6',
      '#3ba0a0',
      '#218f8f',
      '#0b6f6f',
      '#0b5e5e',
      '#084b4b',
      '#053939',
    ],
  },
  fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
  headings: { fontFamily: 'Inter, Segoe UI, Arial, sans-serif' },
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={tema} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
