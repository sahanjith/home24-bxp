import { Button, Drawer, Form } from 'antd';
import { useEffect } from 'react';

import ProductForm from '@/components/ProductForm';
import { useConfirmDiscard } from '@/hooks/useConfirmDiscard';
import { useProductStore } from '@/stores/productStore';

const ProductDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const { drawerVisible, setDrawerVisible, selectedProduct } = useProductStore();

  const { contextHolder, onValuesChange, handleDiscard } = useConfirmDiscard({
    form,
    resetDeps: [drawerVisible, selectedProduct],
    onDiscard: () => setDrawerVisible(false),
  });

  useEffect(() => {
    if (drawerVisible && selectedProduct) {
      form.resetFields();
      form.setFieldsValue({
        name: selectedProduct.name,
        sku: selectedProduct.sku,
        url: selectedProduct.url,
        description: selectedProduct.description,
        available: selectedProduct.available,
        colors: selectedProduct.colors,
        attributes: selectedProduct.attributes || [],
      });
    }
  }, [drawerVisible, selectedProduct, form]);

  return (
    <>
      {contextHolder}
      <Drawer
        title="Edit Product Details"
        width={600}
        open={drawerVisible}
        onClose={handleDiscard}
        destroyOnClose
        forceRender
        footer={
          <div className="flex justify-end space-x-4">
            <Button onClick={handleDiscard}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              className="bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white"
            >
              Save
            </Button>
          </div>
        }
      >
        {selectedProduct && (
          <ProductForm
            form={form}
            product={selectedProduct}
            onCancel={handleDiscard}
            onValuesChange={onValuesChange}
          />
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
