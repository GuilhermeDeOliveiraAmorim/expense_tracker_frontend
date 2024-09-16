"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import { TagFactory } from "@/internal/factory/tag.factory";
import { CreateTagInputDTO } from "@/internal/usecases/create_tag";

export default function AddTagForm() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#1d1d1d");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !color) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    try {
      const user_id = sessionStorage.getItem("user_id");

      if (user_id === null || user_id === undefined) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not authenticated",
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
        return;
      }

      const input: CreateTagInputDTO = {
        user_id: user_id,
        name: name,
        color: color,
      };

      const tagFactory = new TagFactory();
      const createTagUseCase = tagFactory.createTagUseCase();

      const response = await createTagUseCase.execute(input);

      toast({
        variant: "default",
        title: response.message,
        description: "OK",
        style: {
          backgroundColor: "#4ade80",
        },
        action: <Icons.check className="mr-2 h-4 w-4" />,
        duration: 1500,
      });

      setName("");
      setColor("");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
      } else {
        toast({
          variant: "default",
          title: "Error",
          description: "An unexpected error occurred",
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
      }
    }
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
