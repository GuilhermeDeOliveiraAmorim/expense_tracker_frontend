"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "@/internal/usecases/create_category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/components/query_functions/qf.categoy";
import { AuthFormProps } from "@/props_types/auth";

export default function AddCategoryForm({ user_id }: AuthFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#1d1d1d");

  const mutation = useMutation<
    CreateCategoryOutputDTO,
    Error,
    CreateCategoryInputDTO
  >({
    mutationFn: createCategory,
    onSuccess: (output: CreateCategoryOutputDTO) => {
      toast({
        variant: "default",
        title: output.category_id,
        description: output.message,
        style: {
          backgroundColor: "#4ade80",
        },
        duration: 2500,
      });
      queryClient.invalidateQueries({
        queryKey: ["categories", user_id],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 2500,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !color) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        duration: 2500,
      });
      return;
    }

    mutation.mutate({ user_id, name, color });

    setName("");
    setColor("#1d1d1d");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                type="text"
                placeholder="Your category name here"
                value={name}
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
                  value={color}
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
