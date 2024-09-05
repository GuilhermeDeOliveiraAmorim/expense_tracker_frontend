import React from "react";
import * as Form from "@radix-ui/react-form";
import "./signup.css";

const Signup = () => (
  <Form.Root className="FormRoot">
    <Form.Field className="FormField" name="name">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="FormLabel">Name</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your name
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid name
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" type="text" required />
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="email">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="FormLabel">Email</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" type="email" required />
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="password">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="FormLabel">Password</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your password
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" type="password" required />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className="Button" style={{ marginTop: 10 }}>
        Sign Up
      </button>
    </Form.Submit>
  </Form.Root>
);

export default Signup;
