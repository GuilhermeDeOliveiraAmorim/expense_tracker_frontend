import { AxiosInstance } from "axios";
import { CategoryRepository } from "../repository/category.repository";
import { apiRoutes } from "./api_routes";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../usecases/create_category";
import {
  GetCategoriesInputDTO,
  GetCategoriesOutputDTO,
} from "../usecases/get_categories";

export class CategoryGateway implements CategoryRepository {
  constructor(private http: AxiosInstance) {}

  async createCategory(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO> {
    try {
      const output = await this.http.post<CreateCategoryOutputDTO>(
        apiRoutes.createCategory,
        input
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(
    input: GetCategoriesInputDTO
  ): Promise<GetCategoriesOutputDTO> {
    try {
      const output = await this.http.get<GetCategoriesOutputDTO>(
        `${apiRoutes.getCategories}?user_id=${input.user_id}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
