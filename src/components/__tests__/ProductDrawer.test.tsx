import { render, screen, fireEvent } from '@testing-library/react';

import ProductDrawer from '@/components/ProductDrawer';
import { useProductStore } from '@/stores/productStore';

jest.mock('@/stores/productStore', () => ({
  useProductStore: jest.fn(),
}));

describe('ProductDrawer', () => {
  const mockSetDrawerVisible = jest.fn();
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    sku: 'SKU123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductStore as jest.MockedFunction<typeof useProductStore>).mockReturnValue({
      drawerVisible: true,
      setDrawerVisible: mockSetDrawerVisible,
      selectedProduct: mockProduct,
    });
  });

  it('renders the drawer with product form when drawerVisible is true', () => {
    render(<ProductDrawer />);
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });

  it('calls setDrawerVisible(false) when the drawer is closed', () => {
    render(<ProductDrawer />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockSetDrawerVisible).toHaveBeenCalledWith(false);
  });
});
