"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/components/query_functions/qf.categoy";
import { displayNotification } from "@/components/util/notification.handler";
import {
  UpdateCategoryOutputDTO,
  UpdateCategoryInputDTO,
} from "@/internal/usecases/update_category";
import { Category } from "@/internal/domain/category";

type UpdateCategoryFormProps = {
  category: Category;
};

export default function UpdateCategoryForm({
  category,
}: UpdateCategoryFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [categoryName, setName] = useState(category.name);
  const [categoryColor, setColor] = useState(category.color);

  const mutation = useMutation<
    UpdateCategoryOutputDTO,
    Error,
    UpdateCategoryInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: updateCategory,
    onSuccess: (output: UpdateCategoryOutputDTO) =>
      displayNotification({
        outputType: {
          success: output,
        },
        variantToast: "default",
        durationToast: 2500,
        styleToast: {
          backgroundColor: "#4ade80",
        },
        queryClient: queryClient,
        queryKey: {
          query: "get-categories",
          key: "get-categories",
        },
      }),
    onError: (error: Error) =>
      displayNotification({
        durationToast: 2500,
        variantToast: "destructive",
        outputType: {
          error: error,
        },
      }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName || !categoryColor) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        duration: 2500,
      });
      return;
    }

    const input: UpdateCategoryInputDTO = {
      category_id: category.id,
      name: categoryName,
      color: categoryColor,
    };

    mutation.mutate(input);

    setName(categoryName);
    setColor(categoryColor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                type="text"
                placeholder="Your category name here"
                value={categoryName}
                onChange={(e) => setName(e.target.value)}
                aria-label="Category name"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex gap-4">
                <Input
                  id="color"
                  type="color"
                  value={categoryColor}
                  onChange={(e) => setColor(e.target.value)}
                  aria-label="Category color"
                ></Input>
                <Button type="submit">
                  <Icons.save className="w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
