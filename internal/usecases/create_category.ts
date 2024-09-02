import axios from "axios";
import { CategoryRepository } from "../repository/category.repository";

export type CreateCategoryInputDTO = {
  name: string;
  color: string;
};

export type CreateCategoryOutputDTO = {
  category_id: string;
  message: string;
};

export class CreateCategoryUseCase {
  constructor(private CategoryGateway: CategoryRepository) {}

  async execute(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO> {
    try {
      const output = await this.CategoryGateway.createCategory(input);
      console.log(output);
      return output;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error.detail);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
