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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserFactory } from "@/internal/factory/user.factory";
import { LoginInputDTO } from "@/internal/usecases/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Email and password required",
        description: "Email and password required for authentication",
      });
      return;
    }

    try {
      const input: LoginInputDTO = {
        email,
        password,
      };

      const userFactory = new UserFactory();
      const loginUseCase = userFactory.loginUseCase();

      const response = await loginUseCase.execute(input);

      toast({
        variant: "default",
        title: response.name,
        description: response.message,
        style: {
          backgroundColor: "#4ade80",
        },
        duration: 2000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          variant: "default",
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to account</CardTitle>
        <CardDescription>Manage your finances.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
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
          <Button>Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
