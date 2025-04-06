import { Modal, Button } from 'antd';

import { Product } from '@/types';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product, onSave }) => {
  return (
    <Modal
      title="Edit Product"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
        <Button key="save" type="primary" onClick={onSave}>
          Save
        </Button>,
      ]}
    >
      {product ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>SKU:</strong> {product.attributes?.sku}
          </p>
          <p>
            <strong>Description:</strong> {product.attributes?.description}
          </p>
          <p>
            <strong>Available:</strong> {product.attributes?.available ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Colors:</strong> {product.attributes?.colors?.join(', ')}
          </p>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </Modal>
  );
};

export default ProductModal;
