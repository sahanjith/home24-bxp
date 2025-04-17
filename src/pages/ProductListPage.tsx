import { useOutletContext } from 'react-router-dom';

import ProductList from '@/components/ProductList';
import { Product } from '@/types';

const ProductListPage = () => {
  const { selectedCategory } = useOutletContext<{ selectedCategory: number | null }>();
  const { setLastModifiedProduct } = useOutletContext<{
    setLastModifiedProduct: (product: Product | null) => void;
  }>();

  return (
    <ProductList
      selectedCategory={selectedCategory}
      setLastModifiedProduct={setLastModifiedProduct}
    />
  );
};

export default ProductListPage;
