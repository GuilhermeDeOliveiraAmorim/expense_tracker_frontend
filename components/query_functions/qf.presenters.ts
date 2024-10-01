import { PresentersFactory } from "@/internal/factory/presenters.factory";
import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "@/internal/presenters/get_expenses_by_category_period";
import {
  GetMonthlyExpensesByCategoryPeriodInputDTO,
  GetMonthlyExpensesByCategoryPeriodOutputDTO,
} from "@/internal/presenters/get_monthly_expenses_by_category_period";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "@/internal/presenters/get_total_expenses_for_period";

export const getTotalExpensesForPeriod = async (
  input: GetTotalExpensesForPeriodInputDTO
): Promise<GetTotalExpensesForPeriodOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getTotalExpensesForPeriodUseCase =
      presentersFactory.getTotalExpensesForPeriodUseCase();

    const response = await getTotalExpensesForPeriodUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpensesByCategoryPeriod = async (
  input: GetExpensesByCategoryPeriodInputDTO
): Promise<GetExpensesByCategoryPeriodOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getExpensesByCategoryPeriodUseCase =
      presentersFactory.getExpensesByCategoryPeriodUseCase();

    const response = await getExpensesByCategoryPeriodUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyExpensesByCategoryPeriod = async (
  input: GetMonthlyExpensesByCategoryPeriodInputDTO
): Promise<GetMonthlyExpensesByCategoryPeriodOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getMonthlyExpensesByCategoryPeriodUseCase =
      presentersFactory.getMonthlyExpensesByCategoryPeriodUseCase();

    const response = await getMonthlyExpensesByCategoryPeriodUseCase.execute(
      input
    );

    return response;
  } catch (error) {
    throw error;
  }
};
