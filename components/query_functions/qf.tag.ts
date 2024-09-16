import { TagFactory } from "@/internal/factory/tag.factory";

export const getTags = async (user_id: string) => {
  const tagFactory = new TagFactory();
  const response = await tagFactory.getTagsUseCase().execute({ user_id });
  return response;
};
