import { ExpenseGateway } from "../gateway/expense.gateway";
import { CreateExpenseUseCase } from "../usecases/create_expense";
import { DeleteExpensesUseCase } from "../usecases/delete_expense";
import { GetExpensesUseCase } from "../usecases/get_expenses";
import { UpdateExpenseUseCase } from "../usecases/update_expense";
import { http } from "../util/http";

export class ExpenseFactory {
  expenseGateway = new ExpenseGateway(http);

  createExpenseUseCase() {
    return new CreateExpenseUseCase(this.expenseGateway);
  }

  getExpensesUseCase() {
    return new GetExpensesUseCase(this.expenseGateway);
  }

  deleteExpenseUseCase() {
    return new DeleteExpensesUseCase(this.expenseGateway);
  }

  updateExpenseUseCase() {
    return new UpdateExpenseUseCase(this.expenseGateway);
  }
}
