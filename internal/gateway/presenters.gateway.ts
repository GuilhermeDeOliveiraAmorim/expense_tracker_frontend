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
}
