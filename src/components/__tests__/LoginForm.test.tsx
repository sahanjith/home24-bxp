import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from '../LoginForm';

// mock fetch
global.fetch = jest.fn();

const renderForm = () => {
  return render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it('renders username and password input fields and login button', () => {
    renderForm();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('shows validation messages on empty form submit', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter your username/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    });
  });

  it('shows error message when login fails with invalid credentials', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid username or password' }),
    });

    renderForm();

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'wrong@user.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('login-error')).toBeInTheDocument();
    });
  });

  it('saves token and navigates when login is successful', async () => {
    const mockToken = 'mock-token';
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    });

    renderForm();

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'demo@home24.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
    });
  });
});
