import { ExpenseGateway } from "../gateway/expense.gateway";
import { CreateExpenseUseCase } from "../usecases/create_expense";
import { http } from "../util/http";

export class ExpenseFactory {
  expenseGateway = new ExpenseGateway(http);

  createExpenseUseCase() {
    return new CreateExpenseUseCase(this.expenseGateway);
  }
}
