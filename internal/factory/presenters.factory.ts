import { PresentersGateway } from "../gateway/presenters.gateway";
import { GetCategoryTagsTotalsByMonthYearUseCase } from "../presenters/get_category_tags_totals_by_month_year";
import { GetExpensesByCategoryPeriodUseCase } from "../presenters/get_expenses_by_category_period";
import { GetExpensesByMonthYearUseCase } from "../presenters/get_expenses_by_month_year";
import { GetMonthlyExpensesByCategoryYearUseCase } from "../presenters/get_monthly_expenses_by_category_year";
import { GetMonthlyExpensesByTagYearUseCase } from "../presenters/get_monthly_expenses_by_tag_year";
import { GetTotalExpensesForCurrentMonthUseCase } from "../presenters/get_total_expenses_for_current_month";
import { GetTotalExpensesForPeriodUseCase } from "../presenters/get_total_expenses_for_period";
import { GetTotalExpensesMonthCurrentYearUseCase } from "../presenters/get_total_expenses_month_current_year";
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

  getTotalExpensesForCurrentMonthUseCase() {
    return new GetTotalExpensesForCurrentMonthUseCase(this.presentersGateway);
  }

  getTotalExpensesMonthCurrentYearUseCase() {
    return new GetTotalExpensesMonthCurrentYearUseCase(this.presentersGateway);
  }

  getCategoryTagsTotalsByMonthYearUseCase() {
    return new GetCategoryTagsTotalsByMonthYearUseCase(this.presentersGateway);
  }
}
