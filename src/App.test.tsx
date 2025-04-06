import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

process.env.NODE_ENV = 'test';
process.env.VITE_API_BASE_URL = 'http://localhost:5173/api';

jest.mock('@/assets/home24-logo.jpg', () => 'mock-logo');

import LoginPage from '@/pages/LoginPage';

// beforeAll(() => {
//   Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: (query: string) => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     }),
//   });
// });

test('renders LoginPage with login form', () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );
  expect(screen.getByTestId('login-form')).toBeInTheDocument();
});
