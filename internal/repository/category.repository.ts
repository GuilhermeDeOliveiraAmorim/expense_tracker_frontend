import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../usecases/create_category";
import {
  DeleteCategoryInputDTO,
  DeleteCategoryOutputDTO,
} from "../usecases/delete_category";
import {
  GetCategoriesInputDTO,
  GetCategoriesOutputDTO,
} from "../usecases/get_categories";
import {
  UpdateCategoryInputDTO,
  UpdateCategoryOutputDTO,
} from "../usecases/update_category";

export interface CategoryRepository {
  createCategory(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO>;
  getCategories(input: GetCategoriesInputDTO): Promise<GetCategoriesOutputDTO>;
  deleteCategory(
    input: DeleteCategoryInputDTO
  ): Promise<DeleteCategoryOutputDTO>;
  updateCategory(
    input: UpdateCategoryInputDTO
  ): Promise<UpdateCategoryOutputDTO>;
}
