import { PresentersGateway } from "../gateway/presenters.gateway";
import { GetTotalExpensesForPeriodUseCase } from "../presenters/get_total_expenses_for_period";
import { http } from "../util/http";

export class PresentersFactory {
  presentersGateway = new PresentersGateway(http);

  getTotalExpensesForPeriodUseCase() {
    return new GetTotalExpensesForPeriodUseCase(this.presentersGateway);
  }
}
