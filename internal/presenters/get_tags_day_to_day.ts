import axios from "axios";
import { PresentersRepository } from "../repository/presenters.repository";

export type TagDayToDay = {
  amount: number;
  name: string;
  color: string;
};

export type CategoryDayToDay = {
  amount: number;
  name: string;
  color: string;
  tags: TagDayToDay[];
};

export type DayToDay = {
  date: Date;
  number_of_day: number;
  day_of_week: string;
  month: string;
  year: string;
  total_amount: number;
  categories: CategoryDayToDay[];
};

export type GetTagsDayToDayInputDTO = {
  month: string;
  year: string;
};

export type GetTagsDayToDayOutputDTO = {
  days: DayToDay[];
};

export class GetTagsDayToDayUseCase {
  constructor(private PresentersGateway: PresentersRepository) {}

  async execute(
    input: GetTagsDayToDayInputDTO
  ): Promise<GetTagsDayToDayOutputDTO> {
    try {
      const output = await this.PresentersGateway.getTagsDayToDay(input);
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
