import { render, screen, fireEvent } from '@testing-library/react';

import LastModifiedProduct from '@/components/LastModifiedProduct';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/types';
jest.mock('@/stores/productStore', () => ({
  useProductStore: jest.fn(),
}));
jest.mock('@/components/ProductDrawer', () => () => <div role="dialog">Mocked Product Drawer</div>);

const mockProduct: Product = {
  id: 1,
  name: 'Test Sofa',
  categoryId: 100,
  attributes: {
    sku: 12345,
    url: 'https://via.placeholder.com/40',
    available: true,
    description: 'A comfy test sofa',
    colors: ['red', 'blue'],
  },
};

describe('LastModifiedProduct', () => {
  it('renders product name and SKU', () => {
    (useProductStore as jest.MockedFunction<typeof useProductStore>).mockReturnValue({
      lastModifiedProduct: mockProduct,
      setDrawerVisible: jest.fn(),
      setSelectedProduct: jest.fn(),
    });
    render(<LastModifiedProduct />);
    expect(screen.getByTestId('last-modified-heading')).toBeInTheDocument();
    expect(screen.getByTestId('last-modified-product-name')).toBeInTheDocument();
    expect(screen.getByTestId('last-modified-product-sku')).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    (useProductStore as jest.MockedFunction<typeof useProductStore>).mockReturnValue({
      lastModifiedProduct: mockProduct,
      setDrawerVisible: jest.fn(),
      setSelectedProduct: jest.fn(),
    });
    render(<LastModifiedProduct />);
    const button = screen.getByTestId('last-modified-product-button');
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
