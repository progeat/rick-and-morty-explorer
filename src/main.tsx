import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/global.css';
import '@mantine/core/styles.css';
import { App } from './app';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
