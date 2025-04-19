import { Button, Drawer, Form } from 'antd';

import ProductForm from '@/components/ProductForm';
import { useProductStore } from '@/stores/productStore';

const ProductDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const { drawerVisible, setDrawerVisible, selectedProduct } = useProductStore();

  return (
    <>
      <Drawer
        title="Edit Product Details"
        width={600}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        destroyOnClose
        forceRender
        footer={
          <div className="flex justify-end space-x-4">
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
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
            onCancel={() => setDrawerVisible(false)}
          />
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
