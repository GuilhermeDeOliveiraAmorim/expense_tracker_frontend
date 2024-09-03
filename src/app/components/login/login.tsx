"use client";

import { Button, Form, Input, message } from "antd";
import { LoginInputDTO } from "../../../../internal/usecases/login";
import { UserFactory } from "../../../../internal/factory/user.factory";

const Login = () => {
  const onFinish = async (values: LoginInputDTO) => {
    try {
      const userFactory = new UserFactory();

      const loginUseCase = userFactory.loginUseCase();

      const response = await loginUseCase.execute(values);

      message.success(response.message);

      setTimeout(() => {}, 4000);

      window.location.href = "/dashboard";
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Senha" />
      </Form.Item>

      <Form.Item style={{ marginBottom: "0px" }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
