import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../usecases/create_category";

export interface CategoryRepository {
  createCategory(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO>;
}
