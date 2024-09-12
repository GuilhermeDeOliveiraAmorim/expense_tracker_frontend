import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../usecases/create_category";
import {
  GetCategoriesInputDTO,
  GetCategoriesOutputDTO,
} from "../usecases/get_categories";

export interface CategoryRepository {
  createCategory(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO>;
  getCategories(input: GetCategoriesInputDTO): Promise<GetCategoriesOutputDTO>;
}
