import { Drawer, Form, Input, Select } from 'antd';

import DynamicValueInput from '@/components/DynamicValueInput';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CustomAttributesDrawer: React.FC<Props> = ({ open, onClose }) => {
  const form = Form.useFormInstance();

  return (
    <Drawer
      title="Custom Attributes"
      width={500}
      open={open}
      onClose={onClose}
      destroyOnClose={false}
      forceRender
    >
      <div className="p-4">
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

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Done
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default CustomAttributesDrawer;
