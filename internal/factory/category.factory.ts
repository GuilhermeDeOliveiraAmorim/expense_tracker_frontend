import { CategoryGateway } from "../gateway/category.gateway";
import { CreateCategoryUseCase } from "../usecases/create_category";
import { DeleteCategoryUseCase } from "../usecases/delete_category";
import { GetCategoriesUseCase } from "../usecases/get_categories";
import { http } from "../util/http";

export class CategoryFactory {
  categoryGateway = new CategoryGateway(http);

  createCategoryUseCase() {
    return new CreateCategoryUseCase(this.categoryGateway);
  }

  getCategoriesUseCase() {
    return new GetCategoriesUseCase(this.categoryGateway);
  }

  deleteCategoryUseCase() {
    return new DeleteCategoryUseCase(this.categoryGateway);
  }
}
