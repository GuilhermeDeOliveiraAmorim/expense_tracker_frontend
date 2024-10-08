import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";

export type DeleteExpenseInputDTO = {
  expense_id: string;
};

export type DeleteExpenseOutputDTO = {
  message: string;
};

export class DeleteExpensesUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: DeleteExpenseInputDTO): Promise<DeleteExpenseOutputDTO> {
    try {
      const output = await this.ExpenseGateway.deleteExpense(input);
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
