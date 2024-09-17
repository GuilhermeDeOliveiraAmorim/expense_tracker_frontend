import axios from "axios";
import { TagRepository } from "../repository/tag.repository";

export type CreateTagInputDTO = {
  user_id: string;
  name: string;
  color: string;
};

export type CreateTagOutputDTO = {
  tag_id: string;
  success_message: string;
  content_message: string;
};

export class CreateTagUseCase {
  constructor(private TagGateway: TagRepository) {}

  async execute(input: CreateTagInputDTO): Promise<CreateTagOutputDTO> {
    try {
      const output = await this.TagGateway.createTag(input);
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
