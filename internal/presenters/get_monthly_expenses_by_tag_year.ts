import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type TagExpense = {
  tag_name: string;
  tag_color: string;
  total: number;
};

export type MonthlyTagExpense = {
  month: string;
  year: number;
  tags: TagExpense[];
  total: number;
};

export type GetMonthlyExpensesByTagYearInputDTO = {
  year: number;
};

export type GetMonthlyExpensesByTagYearOutputDTO = {
  expenses: MonthlyTagExpense[];
  available_years: number[];
};

export class GetMonthlyExpensesByTagYearUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetMonthlyExpensesByTagYearInputDTO
  ): Promise<GetMonthlyExpensesByTagYearOutputDTO> {
    try {
      const output = await this.PresentersGateway.getMonthlyExpensesByTagYear(
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
