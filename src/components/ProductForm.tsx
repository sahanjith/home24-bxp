import { Input, Switch, Select, Form, App } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

const { TextArea } = Input;

interface ProductFormProps {
  onSave: (updatedProduct: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const productData = await res.json();
        setProduct(productData);
        form.setFieldsValue({
          name: productData.name,
          sku: productData.attributes?.sku,
          url: productData.attributes?.url,
          description: productData.attributes?.description,
          available: productData.attributes?.available,
          colors: productData.attributes?.colors,
        });
      } catch (error) {
        handleError(error);
      }
    };

    fetchProduct();
  }, [id, form]);

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`/api/product/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      onSave(updatedProduct);
      message.success('Product saved successfully');
    } catch (error) {
      handleError(error);
    }
  };

  const handleFinish = (values: {
    name: string;
    sku: number;
    url: string;
    description: string;
    available: boolean;
    colors: string[];
  }) => {
    if (product) {
      const updatedProduct: Product = {
        ...product,
        name: values.name,
        attributes: {
          ...product.attributes,
          sku: values.sku,
          url: values.url,
          description: values.description,
          available: values.available,
          colors: values.colors,
        },
      };
      updateProduct(updatedProduct);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Details</h1>
      {product && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input data-testid="product-name" />
            </Form.Item>

            <Form.Item
              name="sku"
              label="SKU"
              rules={[{ required: true, message: 'Please enter SKU' }]}
            >
              <Input data-testid="product-sku" />
            </Form.Item>

            <Form.Item name="available" label="Available" valuePropName="checked">
              <Switch data-testid="product-available" />
            </Form.Item>
          </div>
          <div className="flex justify-center items-start mt-4 sm:mt-0">
            <img
              src={product?.attributes?.url}
              alt={product.name}
              className="w-full max-w-xs rounded shadow-md"
              data-testid="product-image"
            />
          </div>
          <Form.Item
            name="url"
            label="Image URL"
            className="col-span-2"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input data-testid="product-image-url" />
          </Form.Item>

          <Form.Item name="colors" label="Colors" className="col-span-2">
            <Select mode="multiple" placeholder="Select colors" data-testid="product-colors">
              {[
                'Black',
                'White',
                'Red',
                'Blue',
                'Green',
                'Gray',
                'Brown',
                'Beige',
                'Gold',
                'Silver',
              ].map((color) => (
                <Select.Option key={color} value={color}>
                  {color}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            className="col-span-2"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} data-testid="product-description" />
          </Form.Item>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              data-testid="product-save-button"
              onClick={() => form.submit()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ProductForm;
