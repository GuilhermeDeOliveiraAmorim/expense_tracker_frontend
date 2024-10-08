import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "../presenters/get_expenses_by_category_period";
import {
  GetExpensesByMonthYearInputDTO,
  GetExpensesByMonthYearOutputDTO,
} from "../presenters/get_expenses_by_month_year";
import {
  GetMonthlyExpensesByCategoryYearInputDTO,
  GetMonthlyExpensesByCategoryYearOutputDTO,
} from "../presenters/get_monthly_expenses_by_category_year";
import {
  GetMonthlyExpensesByTagYearInputDTO,
  GetMonthlyExpensesByTagYearOutputDTO,
} from "../presenters/get_monthly_expenses_by_tag_year";
import {
  GetTotalExpensesForCurrentMonthInputDTO,
  GetTotalExpensesForCurrentMonthOutputDTO,
} from "../presenters/get_total_expenses_for_current_month";
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

  getMonthlyExpensesByCategoryYear(
    input: GetMonthlyExpensesByCategoryYearInputDTO
  ): Promise<GetMonthlyExpensesByCategoryYearOutputDTO>;

  getMonthlyExpensesByTagYear(
    input: GetMonthlyExpensesByTagYearInputDTO
  ): Promise<GetMonthlyExpensesByTagYearOutputDTO>;

  getExpensesByMonthYear(
    input: GetExpensesByMonthYearInputDTO
  ): Promise<GetExpensesByMonthYearOutputDTO>;

  getTotalExpensesForCurrentMonth(
    input: GetTotalExpensesForCurrentMonthInputDTO
  ): Promise<GetTotalExpensesForCurrentMonthOutputDTO>;
}
