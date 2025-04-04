import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css'; // AntD v5+ uses reset.css, this is required to placed before tailwind
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
