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
import {
  DeleteExpenseInputDTO,
  DeleteExpenseOutputDTO,
} from "../usecases/delete_expense";

export class ExpenseGateway implements ExpenseRepository {
  constructor(private http: AxiosInstance) {}

  async createExpense(
    input: CreateExpenseInputDTO
  ): Promise<CreateExpenseOutputDTO> {
    try {
      const output = await this.http.post<CreateExpenseOutputDTO>(
        apiRoutes.createExpense,
        input
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getExpenses(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO> {
    try {
      const output = await this.http.get<GetExpensesOutputDTO>(
        `${apiRoutes.getExpenses}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpense(
    input: DeleteExpenseInputDTO
  ): Promise<DeleteExpenseOutputDTO> {
    try {
      const output = await this.http.delete<DeleteExpenseOutputDTO>(
        `${apiRoutes.deleteExpense}?expense_id=${input.expense_id}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
