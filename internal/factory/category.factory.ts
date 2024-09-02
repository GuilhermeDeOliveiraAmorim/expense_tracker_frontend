import { CategoryGateway } from "../gateway/category.gateway";
import { CreateCategoryUseCase } from "../usecases/create_category";
import { http } from "../util/http";

export class CategoryFactory {
  categoryGateway = new CategoryGateway(http);

  createCategoryUseCase() {
    return new CreateCategoryUseCase(this.categoryGateway);
  }
}