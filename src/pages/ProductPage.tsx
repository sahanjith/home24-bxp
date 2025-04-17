import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

const ProductPage = () => {
  const { setLastModifiedProduct } = useOutletContext<{
    setLastModifiedProduct: (product: Product | null) => void;
  }>();

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const productData = await res.json();
        setProduct(productData);
        setLastModifiedProduct(productData);
      } catch (error) {
        handleError(error);
      }
    };

    fetchProduct();
  }, [id, setLastModifiedProduct]);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <ProductForm
      product={product}
      onSave={(product) => {
        setLastModifiedProduct(product);
      }}
    />
  );
};

export default ProductPage;
