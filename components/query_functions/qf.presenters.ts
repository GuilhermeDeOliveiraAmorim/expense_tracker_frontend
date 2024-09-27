import { PresentersFactory } from "@/internal/factory/presenters.factory";
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
