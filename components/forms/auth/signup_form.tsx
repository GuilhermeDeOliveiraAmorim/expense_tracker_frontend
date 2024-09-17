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
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "@/internal/usecases/create_user";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/components/query_functions/qf.auth";
import { displayNotification } from "@/components/util/notification.handler";

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  const mutation = useMutation<CreateUserOutputDTO, Error, CreateUserInputDTO>({
    mutationFn: signup,
    onSuccess: (output: CreateUserOutputDTO) =>
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
          routerPath: "/login",
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

    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Name, email and password required",
        description: "Name, email and password required for create an account",
        duration: 2500,
      });
      return;
    }

    if (password !== passwordConfirmed) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure your passwords match",
        duration: 2500,
      });
      setPasswordConfirmed("");
      return;
    }

    mutation.mutate({ email, name, password });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Understand your finances</CardDescription>
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
                aria-label="Name"
              />
            </div>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Confirm password</Label>
              <Input
                id="password_confirmed"
                type="password"
                placeholder="Enter the password you created here"
                value={passwordConfirmed}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                aria-label="Confirm password"
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
