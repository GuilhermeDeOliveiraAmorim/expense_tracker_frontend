import axios from "axios";
import { TagRepository } from "../repository/tag.repository";
import { Tag } from "../domain/tag";

export type GetTagsInputDTO = {
  user_id: string;
};

export type GetTagsOutputDTO = {
  tags: Tag[];
};

export class GetTagsUseCase {
  constructor(private TagGateway: TagRepository) {}

  async execute(input: GetTagsInputDTO): Promise<GetTagsOutputDTO> {
    try {
      const output = await this.TagGateway.getTags(input);
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
