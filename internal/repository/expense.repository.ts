import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "../usecases/create_expense";
import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "../usecases/get_expenses";

export interface ExpenseRepository {
  createExpense(input: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO>;
  getExpenses(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO>;
}
