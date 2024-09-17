import { AxiosInstance } from "axios";
import { TagRepository } from "../repository/tag.repository";
import { apiRoutes } from "./api_routes";
import { CreateTagInputDTO, CreateTagOutputDTO } from "../usecases/create_tag";
import { GetTagsInputDTO, GetTagsOutputDTO } from "../usecases/get_tags";

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

  async getTags(input: GetTagsInputDTO): Promise<GetTagsOutputDTO> {
    try {
      const output = await this.http.get<GetTagsOutputDTO>(
        `${apiRoutes.getTags}?user_id=${input.user_id}`
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
