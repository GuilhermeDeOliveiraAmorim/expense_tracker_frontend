import {
  GetAvailableMonthsYearsInputDTO,
  GetAvailableMonthsYearsOutputDTO,
} from "../presenters/get_available_months_years";
import {
  GetCategoryTagsTotalsByMonthYearInputDTO,
  GetCategoryTagsTotalsByMonthYearOutputDTO,
} from "../presenters/get_category_tags_totals_by_month_year";
import {
  GetDayToDayExpensesPeriodInputDTO,
  GetDayToDayExpensesPeriodOutputDTO,
} from "../presenters/get_day_to_day_expenses_period";
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
  GetTagsDayToDayInputDTO,
  GetTagsDayToDayOutputDTO,
} from "../presenters/get_tags_day_to_day";
import {
  GetTotalExpensesForCurrentMonthInputDTO,
  GetTotalExpensesForCurrentMonthOutputDTO,
} from "../presenters/get_total_expenses_for_current_month";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "../presenters/get_total_expenses_for_period";
import {
  GetTotalExpensesMonthCurrentYearInputDTO,
  GetTotalExpensesMonthCurrentYearOutputDTO,
} from "../presenters/get_total_expenses_month_current_year";

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

  getTotalExpensesMonthCurrentYear(
    input: GetTotalExpensesMonthCurrentYearInputDTO
  ): Promise<GetTotalExpensesMonthCurrentYearOutputDTO>;

  getCategoryTagsTotalsByMonthYear(
    input: GetCategoryTagsTotalsByMonthYearInputDTO
  ): Promise<GetCategoryTagsTotalsByMonthYearOutputDTO>;

  getAvailableMonthsYears(
    input: GetAvailableMonthsYearsInputDTO
  ): Promise<GetAvailableMonthsYearsOutputDTO>;

  getDayToDayExpensesPeriod(
    input: GetDayToDayExpensesPeriodInputDTO
  ): Promise<GetDayToDayExpensesPeriodOutputDTO>;

  getTagsDayToDay(
    input: GetTagsDayToDayInputDTO
  ): Promise<GetTagsDayToDayOutputDTO>;
}
