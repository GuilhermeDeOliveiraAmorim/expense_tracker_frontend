import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "../usecases/create_expense";
import {
  DeleteExpenseInputDTO,
  DeleteExpenseOutputDTO,
} from "../usecases/delete_expense";
import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "../usecases/get_expenses";

export interface ExpenseRepository {
  createExpense(input: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO>;
  getExpenses(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO>;
  deleteExpense(input: DeleteExpenseInputDTO): Promise<DeleteExpenseOutputDTO>;
}
