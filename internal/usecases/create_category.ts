import axios from "axios";
import { CategoryRepository } from "../repository/category.repository";

export type CreateCategoryInputDTO = {
  user_id: string;
  name: string;
  color: string;
};

export type CreateCategoryOutputDTO = {
  category_id: string;
  success_message: string;
  content_message: string;
};

export class CreateCategoryUseCase {
  constructor(private CategoryGateway: CategoryRepository) {}

  async execute(
    input: CreateCategoryInputDTO
  ): Promise<CreateCategoryOutputDTO> {
    try {
      const output = await this.CategoryGateway.createCategory(input);
      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
