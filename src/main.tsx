import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoute from './routes/route';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
