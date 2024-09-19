import { ExpenseGateway } from "../gateway/expense.gateway";
import { CreateExpenseUseCase } from "../usecases/create_expense";
import { GetExpensesUseCase } from "../usecases/get_expenses";
import { http } from "../util/http";

export class ExpenseFactory {
  expenseGateway = new ExpenseGateway(http);

  createExpenseUseCase() {
    return new CreateExpenseUseCase(this.expenseGateway);
  }

  getExpensesUseCase() {
    return new GetExpensesUseCase(this.expenseGateway);
  }
}
