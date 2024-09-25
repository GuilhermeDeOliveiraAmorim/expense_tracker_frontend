import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";

export type UpdateExpenseInputDTO = {
  expense_id: string;
  amount: number;
  expense_date: string;
  category_id: string;
  notes: string;
  tags: string[];
};

export type UpdateExpenseOutputDTO = {
  expense_id: string;
  success_message: string;
  content_message: string;
};

export class UpdateExpenseUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: UpdateExpenseInputDTO): Promise<UpdateExpenseOutputDTO> {
    try {
      const output = await this.ExpenseGateway.updateExpense(input);
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
