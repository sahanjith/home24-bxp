import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

process.env.NODE_ENV = 'test';
process.env.VITE_API_BASE_URL = 'http://localhost:5173/api';

jest.mock('@/assets/home24-logo.jpg', () => 'mock-logo');

import LoginPage from '@/pages/LoginPage';

test('renders LoginPage with login form', () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );
  expect(screen.getByTestId('login-form')).toBeInTheDocument();
});
