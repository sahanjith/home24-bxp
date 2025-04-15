import { render, screen, fireEvent } from '@testing-library/react';

import LastModifiedProduct from '@/components/LastModifiedProduct';
import { Product } from '@/types';

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
    render(<LastModifiedProduct lastModifiedProduct={mockProduct} />);
    expect(screen.getByTestId('last-modified-heading')).toBeInTheDocument();
    expect(screen.getByTestId('last-modified-product-name')).toBeInTheDocument();
    expect(screen.getByTestId('last-modified-product-sku')).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    render(<LastModifiedProduct lastModifiedProduct={mockProduct} />);
    const button = screen.getByTestId('last-modified-product-button');
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
