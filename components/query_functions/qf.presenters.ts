import { PresentersFactory } from "@/internal/factory/presenters.factory";
import {
  GetAvailableMonthsYearsInputDTO,
  GetAvailableMonthsYearsOutputDTO,
} from "@/internal/presenters/get_available_months_years";
import {
  GetCategoryTagsTotalsByMonthYearInputDTO,
  GetCategoryTagsTotalsByMonthYearOutputDTO,
} from "@/internal/presenters/get_category_tags_totals_by_month_year";
import {
  GetDayToDayExpensesPeriodInputDTO,
  GetDayToDayExpensesPeriodOutputDTO,
} from "@/internal/presenters/get_day_to_day_expenses_period";
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
  GetTagsDayToDayInputDTO,
  GetTagsDayToDayOutputDTO,
} from "@/internal/presenters/get_tags_day_to_day";
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

export const getCategoryTagsTotalsByMonthYear = async (
  input: GetCategoryTagsTotalsByMonthYearInputDTO
): Promise<GetCategoryTagsTotalsByMonthYearOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getCategoryTagsTotalsByMonthYearUseCase =
      presentersFactory.getCategoryTagsTotalsByMonthYearUseCase();

    const response = await getCategoryTagsTotalsByMonthYearUseCase.execute(
      input
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAvailableMonthsYears = async (
  input: GetAvailableMonthsYearsInputDTO
): Promise<GetAvailableMonthsYearsOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getAvailableMonthsYearsUseCase =
      presentersFactory.getAvailableMonthsYearsUseCase();

    const response = await getAvailableMonthsYearsUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getDayToDayExpensesPeriod = async (
  input: GetDayToDayExpensesPeriodInputDTO
): Promise<GetDayToDayExpensesPeriodOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getDayToDayExpensesPeriodUseCase =
      presentersFactory.getDayToDayExpensesPeriodUseCase();

    const response = await getDayToDayExpensesPeriodUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getTagsDayToDay = async (
  input: GetTagsDayToDayInputDTO
): Promise<GetTagsDayToDayOutputDTO> => {
  try {
    const presentersFactory = new PresentersFactory();
    const getTagsDayToDayUseCase = presentersFactory.getTagsDayToDayUseCase();

    const response = await getTagsDayToDayUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
