import { Button, Form, Input } from 'antd';

export default function LoginForm() {
  return (
    <Form name="login" layout="vertical" onFinish={() => {}} className="w-full">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
        className="mb-8"
      >
        <Input placeholder="Username" size="large" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        className="mb-8"
      >
        <Input.Password placeholder="Password" size="large" />
      </Form.Item>
      <Form.Item className="mt-8 mb-0">
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className="!bg-blue-500 hover:!bg-blue-600 !text-white"
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
