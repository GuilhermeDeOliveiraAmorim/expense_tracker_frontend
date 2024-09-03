import { GetCategoriesInputDTO } from "../../../../internal/usecases/get_categories";
import { CategoryFactory } from "../../../../internal/factory/category.factory";
import { Table, TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  color: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    render: (color) => (
      <div
        style={{
          backgroundColor: color,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          display: "inline-block",
        }}
      />
    ),
  },
];

export async function ListCategory() {
  const categoryFactory = new CategoryFactory();
  const getCategoriesUseCase = categoryFactory.getCategoriesUseCase();

  const input: GetCategoriesInputDTO = {};

  const response = await getCategoriesUseCase.execute(input);

  if (!response) {
    return <p>No categories found</p>;
  }

  if (response.categories.length === 0) {
    return <p>No categories found</p>;
  }

  const categories: DataType[] = [];

  response.categories.forEach((category) => {
    categories.push({
      key: category.id,
      name: category.name,
      color: category.color,
    });
  });

  return <Table columns={columns} dataSource={categories} />;
}
