import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { App, ConfigProvider } from 'antd';

import { customAntTheme } from '@/theme/antdTheme';
import { Product } from '@/types';

import ProductModal from '../ProductModal';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  categoryId: 100,
  attributes: {
    sku: 12345,
    url: 'https://example.com/image.jpg',
    description: 'Sample description',
    available: true,
    colors: ['Red', 'Blue'],
  },
};

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <ConfigProvider theme={customAntTheme}>
      <App>{ui}</App>
    </ConfigProvider>,
  );
};

describe('ProductModal', () => {
  it('renders modal with product details', () => {
    renderWithProviders(
      <ProductModal visible={true} onClose={jest.fn()} product={mockProduct} onSave={jest.fn()} />,
    );

    expect(screen.getByTestId('product-name')).toHaveValue(mockProduct.name);
    expect(screen.getByTestId('product-sku')).toHaveValue(String(mockProduct.attributes?.sku));
    expect(screen.getByTestId('product-image-url')).toHaveValue(mockProduct.attributes?.url);
    expect(screen.getByTestId('product-description')).toHaveValue(
      mockProduct.attributes?.description,
    );
  });

  it('calls onSave and closes on successful save', async () => {
    const mockResponse = {
      id: 1,
      name: 'Updated Product',
      categoryId: 100,
      attributes: {
        sku: 12345,
        url: 'https://example.com/image.jpg',
        description: 'Updated description',
        available: true,
        colors: ['Red', 'Blue'],
      },
    };

    const globalWithFetch = global as typeof globalThis & {
      fetch: jest.Mock;
    };
    globalWithFetch.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const onSave = jest.fn();
    const onClose = jest.fn();

    await act(async () => {
      renderWithProviders(
        <ProductModal visible={true} onClose={onClose} product={mockProduct} onSave={onSave} />,
      );
    });

    fireEvent.change(screen.getByTestId('product-name'), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByTestId('product-save-button'));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    globalWithFetch.fetch.mockRestore();
  });

  it('displays an error when required fields are missing', async () => {
    renderWithProviders(
      <ProductModal
        visible={true}
        onClose={jest.fn()}
        product={{ ...mockProduct, name: '' }}
        onSave={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByTestId('product-name'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('product-save-button'));

    await waitFor(() => {
      expect(screen.getByText(/Please enter product name/i)).toBeInTheDocument();
    });
  });
});
