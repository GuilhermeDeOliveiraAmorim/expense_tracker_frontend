"use client";

import React from "react";
import { Button, Flex, Form, FormProps, Input, message } from "antd";
import Password from "antd/es/input/Password";
import { UserFactory } from "../../internal/factory/user.factory";
import { CreateUserInputDTO } from "../../internal/usecases/create_user";

const Signup: React.FC = () => {
  const onFinish = async (values: CreateUserInputDTO) => {
    try {
      const userFactory = new UserFactory();

      const createUserUseCase = userFactory.createUserUseCase();

      const response = await createUserUseCase.execute(values);

      message.success(response.user_id);
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
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        name="signup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{ width: 300 }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Por favor, insira seu e-mail!" },
            { type: "email", message: "Por favor, insira um e-mail válido!" },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
        >
          <Password placeholder="Senha" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Signup;
