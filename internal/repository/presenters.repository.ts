import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "../presenters/get_expenses_by_category_period";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "../presenters/get_total_expenses_for_period";

export interface PresentersRepository {
  getTotalExpensesForPeriod(
    input: GetTotalExpensesForPeriodInputDTO
  ): Promise<GetTotalExpensesForPeriodOutputDTO>;

  getExpensesByCategoryPeriod(
    input: GetExpensesByCategoryPeriodInputDTO
  ): Promise<GetExpensesByCategoryPeriodOutputDTO>;
}
