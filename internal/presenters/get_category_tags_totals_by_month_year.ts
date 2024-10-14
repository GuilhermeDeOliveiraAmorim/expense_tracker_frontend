import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type CategoryTagTotal = {
  name: string;
  total: number;
};

export type CategoryWithTags = {
  name: string;
  total: number;
  tags: CategoryTagTotal[];
};

export type MonthOption = {
  label: string;
  value: string;
};

export type CategoryTagsTotals = {
  month: string;
  year: number;
  total: number;
  categories: CategoryWithTags[];
  available_years: number[];
  available_months: MonthOption[];
};

export type GetCategoryTagsTotalsByMonthYearInputDTO = {
  month: string;
  year: number;
};

export type GetCategoryTagsTotalsByMonthYearOutputDTO = {
  expenses: CategoryTagsTotals;
};

export class GetCategoryTagsTotalsByMonthYearUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetCategoryTagsTotalsByMonthYearInputDTO
  ): Promise<GetCategoryTagsTotalsByMonthYearOutputDTO> {
    try {
      const output =
        await this.PresentersGateway.getCategoryTagsTotalsByMonthYear(input);
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
