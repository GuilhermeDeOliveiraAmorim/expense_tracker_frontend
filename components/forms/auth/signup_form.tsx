"use client";

import { Input } from "@/components/ui/input";
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
        variantToast: "default",
        durationToast: 2500,
        outputType: {
          success: output,
        },
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
        variantToast: "destructive",
        durationToast: 2500,
        outputType: {
          error: error,
        },
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

    const input: CreateUserInputDTO = {
      email,
      name,
      password,
    };

    mutation.mutate(input);
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full pl-52 pr-52 pb-52 pt-24 justify-between">
      <div className="flex justify-end">
        <Button onClick={goToLoginPage}>Login</Button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 align-middle content-center justify-center w-full h-full"
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your name, email and a password below to create your account
          </p>
        </div>
        <Input
          id="name"
          placeholder="Your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Name"
          className="space-y-1.5"
        />
        <Input
          id="email"
          placeholder="Your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          className="space-y-1.5"
        />
        <Input
          id="password"
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          className="space-y-1.5"
        />
        <Input
          id="password_confirmed"
          type="password"
          placeholder="Enter the password you created"
          value={passwordConfirmed}
          onChange={(e) => setPasswordConfirmed(e.target.value)}
          aria-label="Confirm password"
          className="space-y-1.5"
        />
        <Button>Register</Button>
      </form>
    </div>
  );
}
