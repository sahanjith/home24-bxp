import { useOutletContext } from 'react-router-dom';

import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';

const ProductPage = () => {
  const { setLastModifiedProduct } = useOutletContext<{
    setLastModifiedProduct: (product: Product | null) => void;
  }>();

  return (
    <ProductForm
      onSave={(product) => {
        setLastModifiedProduct(product);
      }}
    />
  );
};

export default ProductPage;
