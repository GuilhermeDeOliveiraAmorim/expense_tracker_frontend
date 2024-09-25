import axios from "axios";
import { TagRepository } from "../repository/tag.repository";

export type UpdateTagInputDTO = {
  tag_id: string;
  name: string;
  color: string;
};

export type UpdateTagOutputDTO = {
  tag_id: string;
  success_message: string;
  content_message: string;
};

export class UpdateTagUseCase {
  constructor(private TagGateway: TagRepository) {}

  async execute(input: UpdateTagInputDTO): Promise<UpdateTagOutputDTO> {
    try {
      const output = await this.TagGateway.updateTag(input);
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
