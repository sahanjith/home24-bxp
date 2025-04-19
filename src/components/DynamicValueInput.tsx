import { Input, Switch, Select, Form } from 'antd';

const { TextArea } = Input;

interface Props {
  name: number;
}

const DynamicValueInput: React.FC<Props> = ({ name }) => {
  const form = Form.useFormInstance();
  const type = Form.useWatch(['attributes', name, 'attributeType'], form);
  const value = Form.useWatch(['attributes', name, 'attributeValue'], form);

  switch (type) {
    case 'text':
    case 'number':
      return (
        <Input
          placeholder="Value"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
    case 'url':
      return (
        <TextArea
          rows={1}
          placeholder="URL"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
    case 'tags':
      return (
        <Select
          mode="tags"
          placeholder="Tags"
          value={value}
          onChange={(val) => form.setFieldValue(['attributes', name, 'attributeValue'], val)}
        />
      );
    case 'boolean':
      return (
        <Switch
          checked={value}
          onChange={(checked) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], checked)
          }
        />
      );
    default:
      return (
        <Input
          placeholder="Value"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            form.setFieldValue(['attributes', name, 'attributeValue'], e.target.value)
          }
        />
      );
  }
};

export default DynamicValueInput;
