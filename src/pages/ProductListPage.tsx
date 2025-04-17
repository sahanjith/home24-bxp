import { useOutletContext } from 'react-router-dom';

import ProductList from '@/components/ProductList';

const ProductListPage = () => {
  const { selectedCategory } = useOutletContext<{ selectedCategory: number | null }>();

  return <ProductList selectedCategory={selectedCategory} />;
};

export default ProductListPage;
