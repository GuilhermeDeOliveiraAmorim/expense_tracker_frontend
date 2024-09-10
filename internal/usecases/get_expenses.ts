import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";
import { Expense } from "../domain/expense";

export type GetExpensesInputDTO = {
  user_id: string;
};

export type GetExpensesOutputDTO = {
  categories: Expense[];
};

export class GetExpensesUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO> {
    try {
      const output = await this.ExpenseGateway.getExpenses(input);
      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error.detail);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
