import { Modal } from 'antd';
import type { FormInstance } from 'antd';
import { useState, useEffect } from 'react';
import type { DependencyList } from 'react';

export interface UseConfirmDiscardOptions<T> {
  form: FormInstance<T>;
  resetDeps: DependencyList;
  onDiscard: () => void;
}

export function useConfirmDiscard<T>({ form, resetDeps, onDiscard }: UseConfirmDiscardOptions<T>) {
  const [modal, contextHolder] = Modal.useModal();
  const [isDirty, setIsDirty] = useState(false);

  const onValuesChange = () => setIsDirty(true);

  useEffect(() => {
    setIsDirty(false);
  }, resetDeps);

  const handleDiscard = () => {
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
          onDiscard();
        },
      });
    } else {
      form.resetFields();
      onDiscard();
    }
  };

  return { contextHolder, onValuesChange, handleDiscard };
}
