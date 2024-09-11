import { AxiosInstance } from "axios";
import { ExpenseRepository } from "../repository/expense.repository";
import { apiRoutes } from "./api_routes";
import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "../usecases/get_expenses";
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "../usecases/create_expense";

export class ExpenseGateway implements ExpenseRepository {
  constructor(private http: AxiosInstance) {}

  async createExpense(
    input: CreateExpenseInputDTO
  ): Promise<CreateExpenseOutputDTO> {
    const output = await this.http.post<CreateExpenseOutputDTO>(
      apiRoutes.createExpense,
      input
    );

    return output.data;
  }

  async getExpenses(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO> {
    const output = await this.http.get<GetExpensesOutputDTO>(
      `${apiRoutes.getExpenses}?user_id=${input.user_id}`
    );

    return output.data;
  }
}
