import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "../usecases/get_expenses";

export interface ExpenseRepository {
  getExpenses(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO>;
}
