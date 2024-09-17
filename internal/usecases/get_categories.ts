import axios from "axios";
import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../domain/category";

export type GetCategoriesInputDTO = {
  user_id: string;
};

export type GetCategoriesOutputDTO = {
  categories: Category[];
};

export class GetCategoriesUseCase {
  constructor(private CategoryGateway: CategoryRepository) {}

  async execute(input: GetCategoriesInputDTO): Promise<GetCategoriesOutputDTO> {
    try {
      const output = await this.CategoryGateway.getCategories(input);
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
