import { Button, Form, Input } from 'antd';

export default function LoginForm() {
  return (
    <Form name="login" layout="vertical" onFinish={() => {}} className="w-full max-w-sm">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
