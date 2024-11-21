import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

type DayToDayExpense = {
  day: string;
  day_name: string;
  month: string;
  year: string;
  amount: number;
};

export type GetDayToDayExpensesPeriodInputDTO = {
  startDate: string;
  endDate: string;
};

export type GetDayToDayExpensesPeriodOutputDTO = {
  expenses: DayToDayExpense[];
};

export class GetDayToDayExpensesPeriodUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetDayToDayExpensesPeriodInputDTO
  ): Promise<GetDayToDayExpensesPeriodOutputDTO> {
    try {
      const output = await this.PresentersGateway.getDayToDayExpensesPeriod(
        input
      );
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
