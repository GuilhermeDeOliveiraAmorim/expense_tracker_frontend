import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

type CategoryTagTotal = {
  name: string;
  total: number;
};

type CategoryWithTags = {
  name: string;
  total: number;
  tags: CategoryTagTotal[];
};

type MonthOption = {
  label: string;
  value: string;
};

type CategoryTagsTotals = {
  month: string;
  year: number;
  total: number;
  categories: CategoryWithTags[];
  availableYears: number[];
  availableMonths: MonthOption[];
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
