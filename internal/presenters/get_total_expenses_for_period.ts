import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type GetTotalExpensesForPeriodInputDTO = {
  startDate: string;
  endDate: string;
};

export type GetTotalExpensesForPeriodOutputDTO = {
  total: number;
};

export class GetTotalExpensesForPeriodUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetTotalExpensesForPeriodInputDTO
  ): Promise<GetTotalExpensesForPeriodOutputDTO> {
    try {
      const output = await this.PresentersGateway.getTotalExpensesForPeriod(
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
