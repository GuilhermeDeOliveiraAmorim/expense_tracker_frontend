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
import { useMutation } from "@tanstack/react-query";
import { login } from "@/components/query_functions/qf.auth";
import { displayNotification } from "@/components/util/notification.handler";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<LoginOutputDTO, Error, LoginInputDTO>({
    mutationFn: login,
    onSuccess: (output: LoginOutputDTO) =>
      displayNotification({
        outputType: {
          success: output,
        },
        variantToast: "default",
        durationToast: 2500,
        styleToast: {
          backgroundColor: "#4ade80",
        },
        redirect: {
          router: router,
          routerPath: "/dashboard",
        },
      }),
    onError: (error: Error) =>
      displayNotification({
        outputType: {
          error: error,
        },
        durationToast: 2500,
        variantToast: "destructive",
      }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Email and password required",
        description: "Email and password required for authentication",
        duration: 2500,
      });
      return;
    }

    mutation.mutate({ email, password });
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
                aria-label="Email"
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
                aria-label="Password"
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
