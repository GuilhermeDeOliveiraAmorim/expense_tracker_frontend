import { AxiosInstance } from "axios";
import { CategoryRepository } from "../repository/category.repository";
import { apiRoutes } from "./api_routes";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../usecases/create_category";

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
}
