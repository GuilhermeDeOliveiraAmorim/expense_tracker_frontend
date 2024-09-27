import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type CategoryExpense = {
  category_name: string;
  category_color: string;
  total: number;
};

export type GetExpensesByCategoryPeriodInputDTO = {
  startDate: string;
  endDate: string;
};

export type GetExpensesByCategoryPeriodOutputDTO = {
  expenses: CategoryExpense[];
};

export class GetExpensesByCategoryPeriodUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetExpensesByCategoryPeriodInputDTO
  ): Promise<GetExpensesByCategoryPeriodOutputDTO> {
    try {
      const output = await this.PresentersGateway.getExpensesByCategoryPeriod(
        input
      );
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
