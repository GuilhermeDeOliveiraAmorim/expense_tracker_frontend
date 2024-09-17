"use client";

import { Input } from "@/components/ui/input";
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

  const goToSignupPage = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col h-full pl-52 pr-52 pb-52 pt-24 justify-between">
      <div className="flex justify-end">
        <Button onClick={goToSignupPage}>Sign Up</Button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 align-middle content-center justify-center w-full h-full"
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to log in to your account
          </p>
        </div>
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
          placeholder="Your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          className="space-y-1.5"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
