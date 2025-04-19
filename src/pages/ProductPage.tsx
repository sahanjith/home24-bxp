import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

const ProductPage = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        handleError(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <ProductForm
      form={form}
      product={product}
      onCancel={() => window.history.back()}
      inlineAttributes
    />
  );
};

export default ProductPage;
