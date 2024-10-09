import { PresentersGateway } from "../gateway/presenters.gateway";
import { GetExpensesByCategoryPeriodUseCase } from "../presenters/get_expenses_by_category_period";
import { GetExpensesByMonthYearUseCase } from "../presenters/get_expenses_by_month_year";
import { GetMonthlyExpensesByCategoryYearUseCase } from "../presenters/get_monthly_expenses_by_category_year";
import { GetMonthlyExpensesByTagYearUseCase } from "../presenters/get_monthly_expenses_by_tag_year";
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

  getMonthlyExpensesByCategoryYearUseCase() {
    return new GetMonthlyExpensesByCategoryYearUseCase(this.presentersGateway);
  }

  getMonthlyExpensesByTagYearUseCase() {
    return new GetMonthlyExpensesByTagYearUseCase(this.presentersGateway);
  }

  getExpensesByMonthYearUseCase() {
    return new GetExpensesByMonthYearUseCase(this.presentersGateway);
  }
}
