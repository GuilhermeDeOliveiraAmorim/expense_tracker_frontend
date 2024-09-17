import { TagFactory } from "@/internal/factory/tag.factory";
import {
  CreateTagInputDTO,
  CreateTagOutputDTO,
} from "@/internal/usecases/create_tag";

export const getTags = async (user_id: string) => {
  const tagFactory = new TagFactory();
  const response = await tagFactory.getTagsUseCase().execute({ user_id });
  return response;
};

export const createTag = async (
  input: CreateTagInputDTO
): Promise<CreateTagOutputDTO> => {
  const categoryFactory = new TagFactory();
  const createTagUseCase = categoryFactory.createTagUseCase();
  return createTagUseCase.execute(input);
};
