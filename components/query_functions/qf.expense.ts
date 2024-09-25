import { ExpenseFactory } from "@/internal/factory/expense.factory";
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "@/internal/usecases/create_expense";
import {
  DeleteExpenseInputDTO,
  DeleteExpenseOutputDTO,
} from "@/internal/usecases/delete_expense";
import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "@/internal/usecases/get_expenses";
import {
  UpdateExpenseInputDTO,
  UpdateExpenseOutputDTO,
} from "@/internal/usecases/update_expense";

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

export const getExpenses = async (
  input: GetExpensesInputDTO
): Promise<GetExpensesOutputDTO> => {
  try {
    const expenseFactory = new ExpenseFactory();
    const getExpensesUseCase = expenseFactory.getExpensesUseCase();

    const response = await getExpensesUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (
  input: DeleteExpenseInputDTO
): Promise<DeleteExpenseOutputDTO> => {
  try {
    const expenseFactory = new ExpenseFactory();
    const deleteExpensesUseCase = expenseFactory.deleteExpenseUseCase();

    const response = await deleteExpensesUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (
  input: UpdateExpenseInputDTO
): Promise<UpdateExpenseOutputDTO> => {
  try {
    const expenseFactory = new ExpenseFactory();
    const updateExpenseUseCase = expenseFactory.updateExpenseUseCase();

    const response = await updateExpenseUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
