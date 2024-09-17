import { CategoryFactory } from "@/internal/factory/category.factory";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "@/internal/usecases/create_category";

export const getCategories = async (user_id: string) => {
  const categoryFactory = new CategoryFactory();
  const response = await categoryFactory
    .getCategoriesUseCase()
    .execute({ user_id });
  return response;
};

export const createCategory = async (
  input: CreateCategoryInputDTO
): Promise<CreateCategoryOutputDTO> => {
  const categoryFactory = new CategoryFactory();
  const createCategoryUseCase = categoryFactory.createCategoryUseCase();
  return createCategoryUseCase.execute(input);
};
