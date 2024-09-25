import { TagFactory } from "@/internal/factory/tag.factory";
import {
  CreateTagInputDTO,
  CreateTagOutputDTO,
} from "@/internal/usecases/create_tag";
import {
  DeleteTagInputDTO,
  DeleteTagOutputDTO,
} from "@/internal/usecases/delete_tag";
import {
  GetTagsInputDTO,
  GetTagsOutputDTO,
} from "@/internal/usecases/get_tags";
import {
  UpdateTagInputDTO,
  UpdateTagOutputDTO,
} from "@/internal/usecases/update_tag";

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
    const tagFactory = new TagFactory();
    const createTagUseCase = tagFactory.createTagUseCase();

    const response = await createTagUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTag = async (
  input: DeleteTagInputDTO
): Promise<DeleteTagOutputDTO> => {
  try {
    const tagFactory = new TagFactory();
    const deleteTagUseCase = tagFactory.deleteTagUseCase();

    const response = await deleteTagUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTag = async (
  input: UpdateTagInputDTO
): Promise<UpdateTagOutputDTO> => {
  try {
    const tagFactory = new TagFactory();
    const updateTagUseCase = tagFactory.updateTagUseCase();

    const response = await updateTagUseCase.execute(input);

    return response;
  } catch (error) {
    throw error;
  }
};
