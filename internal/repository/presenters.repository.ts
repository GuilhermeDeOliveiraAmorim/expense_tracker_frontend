import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "../presenters/get_total_expenses_for_period";

export interface PresentersRepository {
  getTotalExpensesForPeriod(
    input: GetTotalExpensesForPeriodInputDTO
  ): Promise<GetTotalExpensesForPeriodOutputDTO>;
}
