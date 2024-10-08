import axios from "axios";
import { ExpenseRepository } from "../repository/expense.repository";
import { Expense } from "../domain/expense";

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetExpensesInputDTO = {};

export type GetExpensesOutputDTO = {
  expenses: Expense[];
};

export class GetExpensesUseCase {
  constructor(private ExpenseGateway: ExpenseRepository) {}

  async execute(input: GetExpensesInputDTO): Promise<GetExpensesOutputDTO> {
    try {
      const output = await this.ExpenseGateway.getExpenses(input);
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
