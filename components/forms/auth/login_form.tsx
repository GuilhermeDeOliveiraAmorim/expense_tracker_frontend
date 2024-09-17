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
import { LoginInputDTO, LoginOutputDTO } from "@/internal/usecases/login";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/components/query_functions/qf.auth";

export default function LoginForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<LoginOutputDTO, Error, LoginInputDTO>({
    mutationFn: login,
    onSuccess: (output: LoginOutputDTO) => {
      toast({
        variant: "default",
        title: output.name,
        description: output.message,
        style: {
          backgroundColor: "#4ade80",
        },
        action: <Icons.check className="mr-2 h-4 w-4" />,
        duration: 1000,
      });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Email and password required",
        description: "Email and password required for authentication",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    mutation.mutate({ email, password });

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
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
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
