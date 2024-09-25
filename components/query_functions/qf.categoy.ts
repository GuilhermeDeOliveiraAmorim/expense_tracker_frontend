import { CategoryFactory } from "@/internal/factory/category.factory";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "@/internal/usecases/create_category";
import {
  DeleteCategoryInputDTO,
  DeleteCategoryOutputDTO,
} from "@/internal/usecases/delete_category";
import {
  GetCategoriesInputDTO,
  GetCategoriesOutputDTO,
} from "@/internal/usecases/get_categories";
import {
  UpdateCategoryInputDTO,
  UpdateCategoryOutputDTO,
} from "@/internal/usecases/update_category";

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

export const deleteCategory = async (
  input: DeleteCategoryInputDTO
): Promise<DeleteCategoryOutputDTO> => {
  try {
    const expenseFactory = new CategoryFactory();
    const deleteCategoryUseCase = expenseFactory.deleteCategoryUseCase();

    const response = await deleteCategoryUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (
  input: UpdateCategoryInputDTO
): Promise<UpdateCategoryOutputDTO> => {
  try {
    const categoryFactory = new CategoryFactory();
    const updateCategoryUseCase = categoryFactory.updateCategoryUseCase();

    const response = await updateCategoryUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
