import { PresentersGateway } from "../gateway/presenters.gateway";
import { GetExpensesByCategoryPeriodUseCase } from "../presenters/get_expenses_by_category_period";
import { GetMonthlyExpensesByCategoryPeriodUseCase } from "../presenters/get_monthly_expenses_by_category_period";
import { GetTotalExpensesForPeriodUseCase } from "../presenters/get_total_expenses_for_period";
import { http } from "../util/http";

export class PresentersFactory {
  presentersGateway = new PresentersGateway(http);

  getTotalExpensesForPeriodUseCase() {
    return new GetTotalExpensesForPeriodUseCase(this.presentersGateway);
  }

  getExpensesByCategoryPeriodUseCase() {
    return new GetExpensesByCategoryPeriodUseCase(this.presentersGateway);
  }

  getMonthlyExpensesByCategoryPeriodUseCase() {
    return new GetMonthlyExpensesByCategoryPeriodUseCase(
      this.presentersGateway
    );
  }
}
