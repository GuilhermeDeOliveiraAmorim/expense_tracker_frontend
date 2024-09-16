import { CategoryFactory } from "@/internal/factory/category.factory";

export const getCategories = async (user_id: string) => {
  const categoryFactory = new CategoryFactory();
  const response = await categoryFactory
    .getCategoriesUseCase()
    .execute({ user_id });
  return response;
};
