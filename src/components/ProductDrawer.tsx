import { Drawer, Form } from 'antd';

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
