import axios from "axios";
import { TagRepository } from "../repository/tag.repository";

export type DeleteTagInputDTO = {
  user_id: string;
  tag_id: string;
};

export type DeleteTagOutputDTO = {
  message: string;
};

export class DeleteTagsUseCase {
  constructor(private TagGateway: TagRepository) {}

  async execute(input: DeleteTagInputDTO): Promise<DeleteTagOutputDTO> {
    try {
      const output = await this.TagGateway.deleteTag(input);
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
