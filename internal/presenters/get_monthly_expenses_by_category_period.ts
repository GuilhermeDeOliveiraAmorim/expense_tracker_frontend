import axios from "axios";
import { CategoryExpense } from "./get_expenses_by_category_period";
import { PresentersRepository } from "../repository/presenters.repository";

export type MonthlyCategoryExpense = {
  month: string;
  year: number;
  categories: CategoryExpense[];
};

export type GetMonthlyExpensesByCategoryPeriodInputDTO = {
  year: number;
};

export type GetMonthlyExpensesByCategoryPeriodOutputDTO = {
  expenses: MonthlyCategoryExpense[];
  available_years: number[];
};

export class GetMonthlyExpensesByCategoryPeriodUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetMonthlyExpensesByCategoryPeriodInputDTO
  ): Promise<GetMonthlyExpensesByCategoryPeriodOutputDTO> {
    try {
      const output =
        await this.PresentersGateway.getMonthlyExpensesByCategoryPeriod(input);
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
