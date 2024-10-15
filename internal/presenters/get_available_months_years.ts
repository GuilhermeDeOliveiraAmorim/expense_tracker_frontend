import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type MonthOption = {
  label: string;
  value: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetAvailableMonthsYearsInputDTO = {};

export type GetAvailableMonthsYearsOutputDTO = {
  available_years: number[];
  available_months: MonthOption[];
};

export class GetAvailableMonthsYearsUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetAvailableMonthsYearsInputDTO
  ): Promise<GetAvailableMonthsYearsOutputDTO> {
    try {
      const output = await this.PresentersGateway.getAvailableMonthsYears(
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
