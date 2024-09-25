import axios from "axios";
import { CategoryRepository } from "../repository/category.repository";

export type UpdateCategoryInputDTO = {
  category_id: string;
  name: string;
  color: string;
};

export type UpdateCategoryOutputDTO = {
  category_id: string;
  success_message: string;
  content_message: string;
};

export class UpdateCategoryUseCase {
  constructor(private CategoryGateway: CategoryRepository) {}

  async execute(
    input: UpdateCategoryInputDTO
  ): Promise<UpdateCategoryOutputDTO> {
    try {
      const output = await this.CategoryGateway.updateCategory(input);
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
