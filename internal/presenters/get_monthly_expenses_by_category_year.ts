import axios from "axios";
import { CategoryExpense } from "./get_expenses_by_category_period";
import { PresentersRepository } from "../repository/presenters.repository";

export type MonthlyCategoryExpense = {
  month: string;
  year: number;
  categories: CategoryExpense[];
  total: number;
};

export type GetMonthlyExpensesByCategoryYearInputDTO = {
  year: number;
};

export type GetMonthlyExpensesByCategoryYearOutputDTO = {
  expenses: MonthlyCategoryExpense[];
  available_years: number[];
};

export class GetMonthlyExpensesByCategoryYearUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetMonthlyExpensesByCategoryYearInputDTO
  ): Promise<GetMonthlyExpensesByCategoryYearOutputDTO> {
    try {
      const output =
        await this.PresentersGateway.getMonthlyExpensesByCategoryYear(input);
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
