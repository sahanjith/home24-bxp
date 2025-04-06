import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HeaderBar from '../HeaderBar';

jest.mock('@/assets/home24-logo-full.png', () => 'mock-logo');

const setup = () => {
  render(
    <BrowserRouter>
      <HeaderBar />
    </BrowserRouter>,
  );
};

describe('HeaderBar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders logo and user avatar with dropdown', () => {
    setup();

    expect(screen.getByTestId('logo-main')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
  });

  it('upon clicking logout option user logs out and navigates to login page', () => {
    setup();

    const dropdownTrigger = screen.getByTestId('user-avatar');
    fireEvent.click(dropdownTrigger);

    const logoutItem = screen.getByText('Logout');
    fireEvent.click(logoutItem);

    expect(localStorage.length).toBe(0);
  });
});
