import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";

export type CreateExpenseInputDTO = {
  user_id: string;
  amount: number;
  expense_date: string;
  category_id: string;
  notes: string;
};

export type CreateExpenseOutputDTO = {
  expense_id: string;
};

export class CreateExpenseUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO> {
    try {
      const output = await this.ExpenseGateway.createExpense(input);

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
