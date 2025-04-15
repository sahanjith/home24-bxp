import { useState } from 'react';

import ProductModal from '@/components/ProductModal';
import { Product } from '@/types';

interface LastModifiedProductProps {
  lastModifiedProduct: Product | null;
}

const LastModifiedProduct: React.FC<LastModifiedProductProps> = ({ lastModifiedProduct }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalVisible(true)}
        className="flex items-center gap-3 px-4 py-1 mx-2 rounded-lg bg-gray-50 border border-gray-200 hover:shadow transition text-left w-auto"
      >
        <img
          src={lastModifiedProduct?.attributes?.url || 'https://via.placeholder.com/40'}
          alt="Product"
          className="w-10 h-10 object-cover rounded"
        />
        <div className="text-sm">
          <div className="text-xs text-gray-500 mb-1">Last Modified Product</div>
          <div className="font-medium text-gray-800">{lastModifiedProduct?.name}</div>
          <div className="text-gray-500">{lastModifiedProduct?.attributes?.sku}</div>
        </div>
      </button>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={lastModifiedProduct}
        onSave={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default LastModifiedProduct;
