import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";

export type CreateExpenseInputDTO = {
  amount: string;
  expense_date: string;
  category_id: string;
  notes: string;
  tags: string[];
};

export type CreateExpenseOutputDTO = {
  expense_id: string;
  success_message: string;
  content_message: string;
};

export class CreateExpenseUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO> {
    try {
      const output = await this.ExpenseGateway.createExpense(input);

      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
