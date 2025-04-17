import { Drawer } from 'antd';

import ProductForm from '@/components/ProductForm';
import { useProductStore } from '@/stores/productStore';

const ProductDrawer: React.FC = () => {
  const { drawerVisible, setDrawerVisible, selectedProduct } = useProductStore();
  return (
    <Drawer
      title="Edit Product"
      width={600}
      open={drawerVisible}
      onClose={() => setDrawerVisible(false)}
      destroyOnClose
    >
      {selectedProduct && (
        <ProductForm
          key={selectedProduct.id}
          product={selectedProduct}
          onCancel={() => setDrawerVisible(false)}
        />
      )}
    </Drawer>
  );
};

export default ProductDrawer;
