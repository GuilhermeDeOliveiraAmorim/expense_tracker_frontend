"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTag } from "@/components/query_functions/qf.tag";
import { displayNotification } from "@/components/util/notification.handler";
import {
  UpdateTagOutputDTO,
  UpdateTagInputDTO,
} from "@/internal/usecases/update_tag";
import { Tag } from "@/internal/domain/tag";

type UpdateTagFormProps = {
  tag: Tag;
};

export default function UpdateTagForm({ tag }: UpdateTagFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [tagName, setName] = useState(tag.name);
  const [tagColor, setColor] = useState(tag.color);

  const mutation = useMutation<UpdateTagOutputDTO, Error, UpdateTagInputDTO>({
    mutationKey: ["update-tag"],
    mutationFn: updateTag,
    onSuccess: (output: UpdateTagOutputDTO) =>
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

    if (!tagName || !tagColor) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        duration: 2500,
      });
      return;
    }

    const tag_id = tag.id;
    const name = tagName;
    const color = tagColor;

    mutation.mutate({
      tag_id,
      name,
      color,
    });

    setName("");
    setColor("#1d1d1d");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Tag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                type="text"
                placeholder="Your tag name here"
                value={tagName}
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
                  value={tagColor}
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
