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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add Tag</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row justify-between gap-2">
          <Input
            id="name"
            type="text"
            placeholder="Your tag name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Tag name"
          />
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Tag color"
            className="w-14"
          ></Input>
          <Button type="submit">
            <Icons.save className="w-4" />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
