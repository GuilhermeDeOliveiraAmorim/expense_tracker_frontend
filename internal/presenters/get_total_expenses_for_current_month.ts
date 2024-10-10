import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetTotalExpensesForCurrentMonthInputDTO = {};

export type GetTotalExpensesForCurrentMonthOutputDTO = {
  total_expenses: number;
  current_month: string;
};

export class GetTotalExpensesForCurrentMonthUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetTotalExpensesForCurrentMonthInputDTO
  ): Promise<GetTotalExpensesForCurrentMonthOutputDTO> {
    try {
      const output = await this.PresentersGateway.getTotalExpensesForCurrentMonth(
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
