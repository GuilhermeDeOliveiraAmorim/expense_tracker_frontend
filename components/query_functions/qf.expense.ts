import { ExpenseFactory } from "@/internal/factory/expense.factory";
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "@/internal/usecases/create_expense";

export const createExpense = async (
  input: CreateExpenseInputDTO
): Promise<CreateExpenseOutputDTO> => {
  try {
    const expenseFactory = new ExpenseFactory();
    const createExpenseUseCase = expenseFactory.createExpenseUseCase();

    const response = await createExpenseUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
