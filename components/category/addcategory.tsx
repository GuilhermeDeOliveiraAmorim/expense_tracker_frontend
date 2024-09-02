import { Button, ColorPicker, Form, Input, message } from "antd";
import { CreateCategoryInputDTO } from "../../internal/usecases/create_category";
import { CategoryFactory } from "../../internal/factory/category.factory";

const AddCategory = () => {
  const onFinish = async (values: CreateCategoryInputDTO) => {
    try {
      const categoryFactory = new CategoryFactory();

      const createCategoryUseCase = categoryFactory.createCategoryUseCase();

      console.log(values.color);

      const response = await createCategoryUseCase.execute(values);

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

      <Form.Item
        name="color"
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
