import { Button, Form, Input, message } from 'antd';

import type { LoginFormValues } from '@/types';
import { API_BASE_URL } from '@/utils/api';
import { handleError } from '@/utils/handleError';

export default function LoginForm() {
  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      message.success('Logged in successfully!');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form name="login" layout="vertical" onFinish={onFinish} className="w-full">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please enter your username' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
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
