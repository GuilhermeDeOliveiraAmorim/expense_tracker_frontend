import { TagGateway } from "../gateway/tag.gateway";
import { CreateTagUseCase } from "../usecases/create_tag";
import { GetTagsUseCase } from "../usecases/get_tags";
import { http } from "../util/http";

export class TagFactory {
  tagGateway = new TagGateway(http);

  createTagUseCase() {
    return new CreateTagUseCase(this.tagGateway);
  }

  getTagsUseCase() {
    return new GetTagsUseCase(this.tagGateway);
  }
}
