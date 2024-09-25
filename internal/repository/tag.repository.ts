import { CreateTagInputDTO, CreateTagOutputDTO } from "../usecases/create_tag";
import { DeleteTagInputDTO, DeleteTagOutputDTO } from "../usecases/delete_tag";
import { GetTagsInputDTO, GetTagsOutputDTO } from "../usecases/get_tags";
import { UpdateTagInputDTO, UpdateTagOutputDTO } from "../usecases/update_tag";

export interface TagRepository {
  createTag(input: CreateTagInputDTO): Promise<CreateTagOutputDTO>;
  getTags(input: GetTagsInputDTO): Promise<GetTagsOutputDTO>;
  deleteTag(input: DeleteTagInputDTO): Promise<DeleteTagOutputDTO>;
  updateTag(input: UpdateTagInputDTO): Promise<UpdateTagOutputDTO>;
}
