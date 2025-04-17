import { Drawer } from 'antd';

import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';

interface ProductDrawerProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({ open, product, onClose, onSave }) => {
  return (
    <Drawer title="Edit Product" width={600} open={open} onClose={onClose} destroyOnClose>
      {product && (
        <ProductForm key={product.id} product={product} onSave={onSave} onCancel={onClose} />
      )}
    </Drawer>
  );
};

export default ProductDrawer;
