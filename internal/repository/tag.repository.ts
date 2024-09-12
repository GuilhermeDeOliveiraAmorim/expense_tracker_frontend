import { CreateTagInputDTO, CreateTagOutputDTO } from "../usecases/create_tag";
import { GetTagsInputDTO, GetTagsOutputDTO } from "../usecases/get_tags";

export interface TagRepository {
  createTag(input: CreateTagInputDTO): Promise<CreateTagOutputDTO>;
  getTags(input: GetTagsInputDTO): Promise<GetTagsOutputDTO>;
}
