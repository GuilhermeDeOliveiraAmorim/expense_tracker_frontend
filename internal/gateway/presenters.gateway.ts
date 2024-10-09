import { AxiosInstance } from "axios";
import { apiRoutes } from "./api_routes";
import { PresentersRepository } from "../repository/presenters.repository";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "../presenters/get_total_expenses_for_period";
import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "../presenters/get_expenses_by_category_period";
import {
  GetMonthlyExpensesByCategoryYearInputDTO,
  GetMonthlyExpensesByCategoryYearOutputDTO,
} from "../presenters/get_monthly_expenses_by_category_year";
import {
  GetMonthlyExpensesByTagYearInputDTO,
  GetMonthlyExpensesByTagYearOutputDTO,
} from "../presenters/get_monthly_expenses_by_tag_year";
import {
  GetExpensesByMonthYearInputDTO,
  GetExpensesByMonthYearOutputDTO,
} from "../presenters/get_expenses_by_month_year";

export class PresentersGateway implements PresentersRepository {
  constructor(private http: AxiosInstance) {}

  async getTotalExpensesForPeriod(
    input: GetTotalExpensesForPeriodInputDTO
  ): Promise<GetTotalExpensesForPeriodOutputDTO> {
    try {
      const output = await this.http.get<GetTotalExpensesForPeriodOutputDTO>(
        `${apiRoutes.getTotalExpensesForPeriod}?start_date=${input.startDate}&end_date=${input.endDate}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async getExpensesByCategoryPeriod(
    input: GetExpensesByCategoryPeriodInputDTO
  ): Promise<GetExpensesByCategoryPeriodOutputDTO> {
    try {
      const output = await this.http.get<GetExpensesByCategoryPeriodOutputDTO>(
        `${apiRoutes.getExpensesByCategoryPeriod}?start_date=${input.startDate}&end_date=${input.endDate}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyExpensesByCategoryYear(
    input: GetMonthlyExpensesByCategoryYearInputDTO
  ): Promise<GetMonthlyExpensesByCategoryYearOutputDTO> {
    try {
      const output =
        await this.http.get<GetMonthlyExpensesByCategoryYearOutputDTO>(
          `${apiRoutes.getMonthlyExpensesByCategoryYear}?year=${input.year}`
        );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyExpensesByTagYear(
    input: GetMonthlyExpensesByTagYearInputDTO
  ): Promise<GetMonthlyExpensesByTagYearOutputDTO> {
    try {
      const output = await this.http.get<GetMonthlyExpensesByTagYearOutputDTO>(
        `${apiRoutes.getMonthlyExpensesByTagYear}?year=${input.year}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async getExpensesByMonthYear(
    input: GetExpensesByMonthYearInputDTO
  ): Promise<GetExpensesByMonthYearOutputDTO> {
    try {
      const output = await this.http.get<GetExpensesByMonthYearOutputDTO>(
        `${apiRoutes.getExpensesByMonthYear}?year=${input.year}&month=${input.month}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
