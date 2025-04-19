import { Input, Switch, Select, Form, App, FormInstance, Button } from 'antd';
import { useEffect, useState } from 'react';

import CustomAttributesDrawer from '@/components/CustomAttributesDrawer';
import DynamicValueInput from '@/components/DynamicValueInput';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useProductStore } from '@/stores/productStore';
import { Product, ProductAttribute } from '@/types';
import { handleError } from '@/utils/handleError';

const { TextArea } = Input;

interface ProductFormProps {
  form: FormInstance;
  product: Product;
  onCancel?: () => void;
  inlineAttributes?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  form,
  product,
  onCancel,
  inlineAttributes = false,
}) => {
  const isMobile = useIsMobile();
  const { message } = App.useApp();
  const [customOpen, setCustomOpen] = useState(false);

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
      {isMobile && <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Details</h1>}
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

        {!inlineAttributes && (
          <>
            <Form.Item className="col-span-2">
              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
              >
                Edit Custom Attributes
              </button>
            </Form.Item>
            <CustomAttributesDrawer open={customOpen} onClose={() => setCustomOpen(false)} />
          </>
        )}

        {inlineAttributes && (
          <div className="col-span-2">
            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="mb-4 border p-4 rounded grid grid-cols-1 sm:grid-cols-3 gap-2"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'attributeName']}
                        label="Name"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'attributeType']}
                        label="Type"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Select.Option value="text">Text</Select.Option>
                          <Select.Option value="number">Number</Select.Option>
                          <Select.Option value="url">URL</Select.Option>
                          <Select.Option value="tags">Tags</Select.Option>
                          <Select.Option value="boolean">Boolean</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item shouldUpdate noStyle>
                        {() => {
                          const type = form.getFieldValue(['attributes', name, 'attributeType']);
                          return (
                            <Form.Item
                              {...restField}
                              name={[name, 'attributeValue']}
                              label="Value"
                              rules={[{ required: true }]}
                            >
                              {type ? (
                                <DynamicValueInput name={name} />
                              ) : (
                                <Input disabled placeholder="Select type first" />
                              )}
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                      <button
                        type="button"
                        onClick={() => remove(name)}
                        className="col-span-3 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <Form.Item>
                    <button
                      type="button"
                      onClick={() => add()}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      + Add Attribute
                    </button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        )}

        <Form.Item className="col-span-2 flex justify-end gap-4 mt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" data-testid="product-save-button">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
