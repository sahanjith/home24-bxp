import { Button, Drawer, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';

import ProductForm from '@/components/ProductForm';
import { useProductStore } from '@/stores/productStore';

const ProductDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);
  const { drawerVisible, setDrawerVisible, selectedProduct } = useProductStore();

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
      setIsDirty(false);
    }
  }, [drawerVisible, selectedProduct, form]);

  const [modal, modalContextHolder] = Modal.useModal();

  const handleCloseAttempt = () => {
    if (isDirty) {
      modal.confirm({
        title: 'Unsaved changes',
        content: 'You have unsaved changes. Do you want to close without saving?',
        okText: 'Yes, close',
        cancelText: 'No, stay',
        okButtonProps: {
          className: 'bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white',
        },
        onOk() {
          form.resetFields();
          setDrawerVisible(false);
        },
      });
    } else {
      form.resetFields();
      setDrawerVisible(false);
    }
  };

  return (
    <>
      {modalContextHolder}
      <Drawer
        title="Edit Product Details"
        width={600}
        open={drawerVisible}
        onClose={handleCloseAttempt}
        destroyOnClose
        forceRender
        footer={
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCloseAttempt}>Cancel</Button>
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
            onCancel={() => {
              form.resetFields();
              setDrawerVisible(false);
            }}
            onValuesChange={() => setIsDirty(true)}
          />
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
