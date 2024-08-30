"use client";

import type { FormProps } from "antd";
import { Button, Flex, Form, Input, message } from "antd";
import { LoginInputDTO } from "../../internal/usecases/login";
import { UserFactory } from "../../internal/factory/user.factory";

const Login = () => {
  const onFinish = async (values: LoginInputDTO) => {
    try {
      const userFactory = new UserFactory();

      const loginUseCase = userFactory.loginUseCase();

      const response = await loginUseCase.execute(values);

      message.success(response.access_token);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex justify="center">
      <Form
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{ width: 300 }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
