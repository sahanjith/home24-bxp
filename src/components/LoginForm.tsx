import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { LoginFormValues } from '@/types';
import { getApiBaseUrl } from '@/utils/api';
import { handleError } from '@/utils/handleError';

export default function LoginForm() {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<boolean>(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoginError(false);
    try {
      const response = await fetch(`${getApiBaseUrl()}/login`, {
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
      navigate('/product-list');
    } catch (error) {
      setLoginError(true);
      handleError(error);
    }
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      className="w-full"
      data-testid="login-form"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please enter your username' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
        className="mb-8"
      >
        <Input placeholder="Username" size="large" data-testid="username-input" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        className="mb-8"
      >
        <Input.Password placeholder="Password" size="large" data-testid="password-input" />
      </Form.Item>
      {loginError && (
        <div className="text-red-500 text-sm mb-6 text-center" data-testid="login-error">
          Invalid credentials, please try again or contact system administrator.
        </div>
      )}
      <Form.Item className="mt-8 mb-0">
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className="!bg-blue-500 hover:!bg-blue-600 !text-white"
          data-testid="login-button"
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
