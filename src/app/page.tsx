import { Flex } from "@radix-ui/themes";
import AddCategory from "./components/category/add/addcategory";

export default function Home() {
  return (
    <Flex align="center" gap="3">
      <AddCategory />
    </Flex>
  );
}
