import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HeaderBar from '@/components/HeaderBar';
import { Product } from '@/types';

jest.mock('@/assets/home24-logo-full.png', () => 'mock-logo');

const setup = (lastModifiedProduct: Product | null = null) => {
  render(
    <BrowserRouter>
      <HeaderBar lastModifiedProduct={lastModifiedProduct} />
    </BrowserRouter>,
  );
};

const mockProduct = {
  id: 1,
  name: 'Mock Sofa',
  categoryId: 100,
  attributes: {
    sku: 12345,
    url: 'https://via.placeholder.com/40',
    available: true,
    description: 'A comfortable sofa',
    colors: ['gray'],
  },
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

  it('upon clicking logout option user logs out and navigates to login page', async () => {
    setup();

    const dropdownTrigger = screen.getByTestId('user-avatar');
    fireEvent.click(dropdownTrigger);

    const logoutItem = screen.getByText('Logout');
    fireEvent.click(logoutItem);

    await waitFor(() => {
      expect(localStorage.length).toBe(0);
    });
  });

  it('renders last modified product component when provided', () => {
    setup(mockProduct);
    expect(screen.getByTestId('last-modified-product-button')).toBeInTheDocument();
  });
});
