import { Modal, Input, Switch, Select, Form } from 'antd';
import { useEffect } from 'react';

import { Product } from '@/types';

const { TextArea } = Input;

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product, onSave }) => {
  const [form] = Form.useForm();

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
      onSave(updatedProduct);
    }
  };

  return (
    <Modal
      title="Product Details"
      open={visible}
      onCancel={onClose}
      cancelText="Close"
      className="w-full max-w-5xl"
      footer={null}
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
                <Input />
              </Form.Item>

              <Form.Item
                name="sku"
                label="SKU"
                rules={[{ required: true, message: 'Please enter SKU' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="available" label="Available" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
            <div className="flex justify-center items-start mt-4 sm:mt-0">
              <img
                src={product?.attributes?.url}
                alt={product.name}
                className="w-full max-w-xs rounded shadow-md"
              />
            </div>
            <Form.Item
              name="url"
              label="Image URL"
              className="col-span-2"
              rules={[{ required: true, message: 'Please enter image URL' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="colors" label="Colors" className="col-span-2">
              <Select mode="multiple" placeholder="Select colors">
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
              <TextArea rows={3} />
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default ProductModal;
