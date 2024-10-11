import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type MonthCurrentYear = {
  month: string;
  total: number;
};

export type ExpensesMonthCurrentYear = {
  year: number;
  total: number;
  months: MonthCurrentYear[];
  availableYears: number[];
};

export type GetTotalExpensesMonthCurrentYearInputDTO = {
  year: number;
};

export type GetTotalExpensesMonthCurrentYearOutputDTO = {
  expenses_month_current_year: ExpensesMonthCurrentYear;
};

export class GetTotalExpensesMonthCurrentYearUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetTotalExpensesMonthCurrentYearInputDTO
  ): Promise<GetTotalExpensesMonthCurrentYearOutputDTO> {
    try {
      const output =
        await this.PresentersGateway.getTotalExpensesMonthCurrentYear(input);
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
