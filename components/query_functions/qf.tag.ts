import { TagFactory } from "@/internal/factory/tag.factory";
import {
  CreateTagInputDTO,
  CreateTagOutputDTO,
} from "@/internal/usecases/create_tag";
import {
  GetTagsInputDTO,
  GetTagsOutputDTO,
} from "@/internal/usecases/get_tags";

export const getTags = async (
  input: GetTagsInputDTO
): Promise<GetTagsOutputDTO> => {
  try {
    const tagFactory = new TagFactory();
    const getTagsUseCase = tagFactory.getTagsUseCase();

    const response = await getTagsUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createTag = async (
  input: CreateTagInputDTO
): Promise<CreateTagOutputDTO> => {
  try {
    const categoryFactory = new TagFactory();
    const createTagUseCase = categoryFactory.createTagUseCase();

    const response = await createTagUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
