import { ExpenseFactory } from "@/internal/factory/expense.factory";
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "@/internal/usecases/create_expense";

export const createExpense = async (
  input: CreateExpenseInputDTO
): Promise<CreateExpenseOutputDTO> => {
  const expenseFactory = new ExpenseFactory();
  const createExpenseUseCase = expenseFactory.createExpenseUseCase();
  return createExpenseUseCase.execute(input);
};
