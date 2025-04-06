import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { customAntTheme } from './theme/antdTheme';
import 'antd/dist/reset.css'; // AntD v5+ uses reset.css, this is required to placed before tailwind
import './index.css';

async function prepareApp() {
  // initialzing the MSW for dev and prod environments
  if (typeof window !== 'undefined') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ConfigProvider theme={customAntTheme}>
        <App />
      </ConfigProvider>
    </StrictMode>,
  );
}

prepareApp();
