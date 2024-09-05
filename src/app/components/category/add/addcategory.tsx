import React from "react";
import * as Form from "@radix-ui/react-form";
import "./addcategory.css";

const AddCategory = () => (
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
          Please enter category name
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid category name
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" type="text" required />
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="color">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="FormLabel">Color</Form.Label>
      </div>
      <div className="ColorPickerContainer">
        <input type="color" defaultValue="#1d1d1d" className="ColorPicker" />
      </div>
    </Form.Field>
    <Form.Submit asChild>
      <button className="Button" style={{ marginTop: 10 }}>
        Add Category
      </button>
    </Form.Submit>
  </Form.Root>
);

export default AddCategory;
