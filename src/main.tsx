import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { customAntTheme } from './theme/antdTheme';
import 'antd/dist/reset.css'; // AntD v5+ uses reset.css, this is required to placed before tailwind
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={customAntTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);
