import { AxiosInstance } from "axios";
import { TagRepository } from "../repository/tag.repository";
import { apiRoutes } from "./api_routes";
import { CreateTagInputDTO, CreateTagOutputDTO } from "../usecases/create_tag";
import { GetTagsInputDTO, GetTagsOutputDTO } from "../usecases/get_tags";
import { DeleteTagInputDTO, DeleteTagOutputDTO } from "../usecases/delete_tag";

export class TagGateway implements TagRepository {
  constructor(private http: AxiosInstance) {}

  async createTag(input: CreateTagInputDTO): Promise<CreateTagOutputDTO> {
    try {
      const output = await this.http.post<CreateTagOutputDTO>(
        apiRoutes.createTag,
        input
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(input: GetTagsInputDTO): Promise<GetTagsOutputDTO> {
    try {
      const output = await this.http.get<GetTagsOutputDTO>(
        `${apiRoutes.getTags}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTag(input: DeleteTagInputDTO): Promise<DeleteTagOutputDTO> {
    try {
      const output = await this.http.delete<DeleteTagOutputDTO>(
        `${apiRoutes.deleteTag}?tag_id=${input.tag_id}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
