import { useEffect, useState } from 'react';

import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

interface ProductListProps {
  selectedCategory: number | null;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products/${selectedCategory}`);
        const categoryProducts = await res.json();
        setProducts(categoryProducts);
      } catch (error) {
        handleError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="text-gray-700">
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
