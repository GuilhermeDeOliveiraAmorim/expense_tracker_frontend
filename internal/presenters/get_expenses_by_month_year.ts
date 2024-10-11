import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type ExpenseTag = {
  name: string;
  color: string;
  total: number;
};

export type DayExpense = {
  day: string;
  day_name: string;
  total: number;
  tags: ExpenseTag[];
};

export type WeekExpenses = {
  week: number;
  days: DayExpense[];
};

export type MonthExpenses = {
  month: string;
  year: number;
  total_expenses: number;
  weeks: WeekExpenses[];
  available_years: number[];
};

export type GetExpensesByMonthYearInputDTO = {
  month: string;
  year: number;
};

export type GetExpensesByMonthYearOutputDTO = {
  expenses: MonthExpenses;
};

export class GetExpensesByMonthYearUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetExpensesByMonthYearInputDTO
  ): Promise<GetExpensesByMonthYearOutputDTO> {
    try {
      const output = await this.PresentersGateway.getExpensesByMonthYear(input);
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
