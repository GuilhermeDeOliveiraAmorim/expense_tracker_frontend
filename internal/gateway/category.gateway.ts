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
    const output = await this.http.post<CreateCategoryOutputDTO>(
      apiRoutes.createCategory,
      input
    );

    console.log(output);

    return output.data;
  }

  async getCategories(
    input: GetCategoriesInputDTO
  ): Promise<GetCategoriesOutputDTO> {
    const output = await this.http.get<GetCategoriesOutputDTO>(
      apiRoutes.getCategories
    );

    console.log(output);

    return output.data;
  }
}
