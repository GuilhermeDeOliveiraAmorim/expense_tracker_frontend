import { PresentersFactory } from "@/internal/factory/presenters.factory";
import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "@/internal/presenters/get_expenses_by_category_period";
import {
  GetExpensesByMonthYearInputDTO,
  GetExpensesByMonthYearOutputDTO,
} from "@/internal/presenters/get_expenses_by_month_year";
import {
  GetMonthlyExpensesByCategoryYearInputDTO,
  GetMonthlyExpensesByCategoryYearOutputDTO,
} from "@/internal/presenters/get_monthly_expenses_by_category_year";
import {
  GetMonthlyExpensesByTagYearInputDTO,
  GetMonthlyExpensesByTagYearOutputDTO,
} from "@/internal/presenters/get_monthly_expenses_by_tag_year";
import {
  GetTotalExpensesForCurrentMonthInputDTO,
  GetTotalExpensesForCurrentMonthOutputDTO,
} from "@/internal/presenters/get_total_expenses_for_current_month";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "@/internal/presenters/get_total_expenses_for_period";
import {
  GetTotalExpensesMonthCurrentYearInputDTO,
  GetTotalExpensesMonthCurrentYearOutputDTO,
} from "@/internal/presenters/get_total_expenses_month_current_year";

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

export const getMonthlyExpensesByCategoryYear = async (
  input: GetMonthlyExpensesByCategoryYearInputDTO
): Promise<GetMonthlyExpensesByCategoryYearOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getMonthlyExpensesByCategoryYearUseCase =
      presentersFactory.getMonthlyExpensesByCategoryYearUseCase();

    const response = await getMonthlyExpensesByCategoryYearUseCase.execute(
      input
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyExpensesByTagYear = async (
  input: GetMonthlyExpensesByTagYearInputDTO
): Promise<GetMonthlyExpensesByTagYearOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getMonthlyExpensesByTagYearUseCase =
      presentersFactory.getMonthlyExpensesByTagYearUseCase();

    const response = await getMonthlyExpensesByTagYearUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpensesByMonthYear = async (
  input: GetExpensesByMonthYearInputDTO
): Promise<GetExpensesByMonthYearOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getExpensesByMonthYearUseCase =
      presentersFactory.getExpensesByMonthYearUseCase();

    const response = await getExpensesByMonthYearUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getTotalExpensesForCurrentMonth = async (
  input: GetTotalExpensesForCurrentMonthInputDTO
): Promise<GetTotalExpensesForCurrentMonthOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getTotalExpensesForCurrentMonthUseCase =
      presentersFactory.getTotalExpensesForCurrentMonthUseCase();

    const response = await getTotalExpensesForCurrentMonthUseCase.execute(
      input
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getTotalExpensesMonthCurrentYear = async (
  input: GetTotalExpensesMonthCurrentYearInputDTO
): Promise<GetTotalExpensesMonthCurrentYearOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getTotalExpensesMonthCurrentYearUseCase =
      presentersFactory.getTotalExpensesMonthCurrentYearUseCase();

    const response = await getTotalExpensesMonthCurrentYearUseCase.execute(
      input
    );

    return response;
  } catch (error) {
    throw error;
  }
};
