import { CategoryFactory } from "@/internal/factory/category.factory";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "@/internal/usecases/create_category";
import {
  GetCategoriesInputDTO,
  GetCategoriesOutputDTO,
} from "@/internal/usecases/get_categories";

export const getCategories = async (
  input: GetCategoriesInputDTO
): Promise<GetCategoriesOutputDTO> => {
  try {
    const categoryFactory = new CategoryFactory();
    const getCategoriesUseCase = categoryFactory.getCategoriesUseCase();

    const response = await getCategoriesUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (
  input: CreateCategoryInputDTO
): Promise<CreateCategoryOutputDTO> => {
  try {
    const categoryFactory = new CategoryFactory();
    const createCategoryUseCase = categoryFactory.createCategoryUseCase();

    const response = await createCategoryUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
