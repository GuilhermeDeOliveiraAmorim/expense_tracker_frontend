import axios from "axios";
import { CategoryRepository } from "../repository/category.repository";

export type DeleteCategoryInputDTO = {
  user_id: string;
  category_id: string;
};

export type DeleteCategoryOutputDTO = {
  message: string;
};

export class DeleteCategoryUseCase {
  constructor(private CategoryGateway: CategoryRepository) {}

  async execute(
    input: DeleteCategoryInputDTO
  ): Promise<DeleteCategoryOutputDTO> {
    try {
      const output = await this.CategoryGateway.deleteCategory(input);
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
