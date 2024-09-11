"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserFactory } from "@/internal/factory/user.factory";
import { CreateUserInputDTO } from "@/internal/usecases/create_user";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";

export default function SignupForm() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Name, email and password required",
        description: "Name, email and password required for create an account",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    try {
      const input: CreateUserInputDTO = {
        name,
        email,
        password,
      };

      const userFactory = new UserFactory();
      const createUserUseCase = userFactory.createUserUseCase();

      const response = await createUserUseCase.execute(input);

      toast({
        variant: "default",
        title: response.user_id,
        description: response.message,
        style: {
          backgroundColor: "#4ade80",
        },
        action: <Icons.check className="mr-2 h-4 w-4" />,
        duration: 1500,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Understand your finances.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Email</Label>
              <Input
                id="email"
                placeholder="Your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Register</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
