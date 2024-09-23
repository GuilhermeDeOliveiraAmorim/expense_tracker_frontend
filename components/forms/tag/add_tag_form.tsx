"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import {
  CreateTagInputDTO,
  CreateTagOutputDTO,
} from "@/internal/usecases/create_tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "@/components/query_functions/qf.tag";
import { displayNotification } from "@/components/util/notification.handler";

export default function AddTagForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#1d1d1d");

  const mutation = useMutation<CreateTagOutputDTO, Error, CreateTagInputDTO>({
    mutationKey: ["add-tag"],
    mutationFn: createTag,
    onSuccess: (output: CreateTagOutputDTO) =>
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
          query: "get-tags",
          key: "get-tags",
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

    if (!name || !color) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        duration: 2500,
      });
      return;
    }

    mutation.mutate({ name, color });

    setName("");
    setColor("#1d1d1d");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Tag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                type="text"
                placeholder="Your tag name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Tag name"
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
                  aria-label="Tag color"
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
