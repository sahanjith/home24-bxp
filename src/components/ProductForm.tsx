import { Input, Switch, Select, Form, App } from 'antd';
import { useEffect } from 'react';

import { useProductStore } from '@/stores/productStore';
import { Product, ProductAttribute } from '@/types';
import { handleError } from '@/utils/handleError';

const { TextArea } = Input;

const DynamicValueInput = ({ name }: { name: number }) => {
  const form = Form.useFormInstance();
  const type = Form.useWatch(['attributes', name, 'attributeType'], form);
  const value = Form.useWatch(['attributes', name, 'attributeValue'], form);

  switch (type) {
    case 'text':
    case 'number':
      return (
        <Input
          placeholder="Value"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
    case 'url':
      return (
        <TextArea
          rows={1}
          placeholder="URL"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
    case 'tags':
      return (
        <Select
          mode="tags"
          placeholder="Tags"
          value={value}
          onChange={(val) => form.setFieldValue(['attributes', name, 'attributeValue'], val)}
        />
      );
    case 'boolean':
      return (
        <Switch
          checked={value}
          onChange={(checked) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], checked)
          }
        />
      );
    default:
      return (
        <Input
          placeholder="Value"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
  }
};

interface ProductFormProps {
  product: Product;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onCancel }) => {
  console.log('product', product);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const updateProductInStore = useProductStore((state) => state.updateProduct);
  const setDrawerVisible = useProductStore((state) => state.setDrawerVisible);
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  useEffect(() => {
    form.setFieldsValue({
      name: product.name,
      sku: product.sku,
      url: product.url,
      description: product.description,
      available: product.available,
      colors: product.colors,
      attributes: product.attributes || [],
    });
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

      updateProductInStore(updatedProduct);
      message.success('Product saved successfully');
      setDrawerVisible(false);
      setSelectedProduct(null);
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
    attributes?: ProductAttribute[];
  }) => {
    if (product) {
      const updatedProduct: Product = {
        ...product,
        name: values.name,
        sku: values.sku,
        url: values.url,
        description: values.description,
        available: values.available,
        colors: values.colors,
        attributes: values.attributes,
      };
      updateProduct(updatedProduct);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Details</h1>
      <Form
        data-testid="product-form"
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
            src={product?.url}
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

        {product.colors && (
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
        )}
        {product.description && (
          <Form.Item
            name="description"
            label="Description"
            className="col-span-2"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} data-testid="product-description" />
          </Form.Item>
        )}

        <Form.List name="attributes">
          {(fields, { add, remove }) => (
            <div className="col-span-2 space-y-4">
              <label className="block text-sm font-medium text-gray-700">Custom Attributes</label>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border p-4 rounded"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'attributeName']}
                    rules={[{ required: true, message: 'Enter attribute name' }]}
                  >
                    <Input placeholder="Attribute Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'attributeType']}
                    rules={[{ required: true, message: 'Select attribute type' }]}
                  >
                    <Select placeholder="Type">
                      <Select.Option value="text">Text</Select.Option>
                      <Select.Option value="number">Number</Select.Option>
                      <Select.Option value="url">URL</Select.Option>
                      <Select.Option value="tags">Tags</Select.Option>
                      <Select.Option value="boolean">Boolean</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    shouldUpdate={(prev, curr) =>
                      prev.attributes?.[name]?.attributeType !==
                      curr.attributes?.[name]?.attributeType
                    }
                  >
                    {() => {
                      const type = form.getFieldValue(['attributes', name, 'attributeType']);
                      return (
                        <Form.Item
                          {...restField}
                          name={[name, 'attributeValue']}
                          rules={[{ required: true, message: 'Enter value' }]}
                        >
                          {type ? <DynamicValueInput name={name} /> : null}
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                  <button
                    type="button"
                    onClick={() => remove(name)}
                    className="text-red-500 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <Form.Item>
                <button
                  type="button"
                  onClick={() => add()}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
                >
                  Add Attribute
                </button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onCancel || (() => window.history.back())}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-testid="product-save-button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
