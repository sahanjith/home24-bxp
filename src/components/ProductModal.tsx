import { Modal, Input, Switch, Select, Form, App } from 'antd';
import { useEffect } from 'react';

import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

const { TextArea } = Input;

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product, onSave }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        sku: product.attributes?.sku,
        url: product.attributes?.url,
        description: product.attributes?.description,
        available: product.attributes?.available,
        colors: product.attributes?.colors,
      });
    }
  }, [product, form]);

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
      onClose();
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
    <Modal
      title="Product Details"
      open={visible}
      onCancel={onClose}
      cancelText="Close"
      className="w-full max-w-5xl"
      footer={[
        <button
          key="cancel"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        >
          Cancel
        </button>,
        <button
          data-testid="product-save-button"
          key="submit"
          onClick={() => form.submit()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-2"
        >
          Save
        </button>,
      ]}
    >
      {product && (
        <div className="space-y-4">
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
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default ProductModal;
