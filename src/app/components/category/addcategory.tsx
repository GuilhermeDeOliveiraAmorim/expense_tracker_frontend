import { Button, ColorPicker, Form, Input, message } from "antd";
import { CategoryFactory } from "../../../../internal/factory/category.factory";
import { CreateCategoryInputDTO } from "../../../../internal/usecases/create_category";
import { rgbToHex } from "../../../../util/functions";

type colorObject = {
  cleared: boolean;
  metaColor: {
    isValid: boolean;
    r: number;
    g: number;
    b: number;
    a: number;
    _h: number;
    _s: number;
    _v: number;
  };
};

const AddCategory = () => {
  const onFinish = async (values: { name: string; metaColor: colorObject }) => {
    try {
      const categoryFactory = new CategoryFactory();

      const createCategoryUseCase = categoryFactory.createCategoryUseCase();

      const input: CreateCategoryInputDTO = {
        name: values.name,
        color: rgbToHex(
          values.metaColor.metaColor.r,
          values.metaColor.metaColor.g,
          values.metaColor.metaColor.b
        ),
      };

      const response = await createCategoryUseCase.execute(input);

      message.success(response.message);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Form name="createCategory" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input category name!" }]}
      >
        <Input placeholder="Category" />
      </Form.Item>

      <Form.Item<colorObject>
        name={"metaColor"}
        rules={[{ required: true, message: "Please input category color!" }]}
      >
        <ColorPicker size="small" showText />
      </Form.Item>

      <Form.Item style={{ marginBottom: "0px" }}>
        <Button type="primary" htmlType="submit">
          Nova Categoria
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
