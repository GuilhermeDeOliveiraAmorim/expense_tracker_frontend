import { toast } from "@/hooks/use-toast";
import { QueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CSSProperties } from "react";
import axios from "axios";

type DisplayNotificationProps = {
  durationToast: number;
  variantToast: "default" | "destructive" | null | undefined;
  outputType: {
    success?: any;
    error?: Error;
  };
  styleToast?: CSSProperties;
  queryClient?: QueryClient;
  queryKey?: {
    query: string;
    key: string;
  };
  redirect?: {
    router: AppRouterInstance;
    routerPath: string;
  };
};

export const displayNotification = ({
  outputType,
  durationToast,
  queryClient,
  queryKey,
  redirect,
  styleToast,
  variantToast,
}: DisplayNotificationProps) => {
  if (outputType.error) {
    let titleError = "";
    let descriptionError = "";

    if (axios.isAxiosError(outputType.error)) {
      titleError = outputType.error.response?.data.error.title;
      descriptionError = outputType.error.response?.data.error.detail;
    } else {
      titleError = outputType.error.name;
      descriptionError = outputType.error.message;
    }

    toast({
      variant: variantToast,
      title: titleError,
      description: descriptionError,
      duration: durationToast,
    });

    return;
  }

  toast({
    variant: variantToast,
    title: outputType.success.success_message,
    description: outputType.success.content_message,
    style: styleToast,
    duration: durationToast,
  });

  if (queryClient && queryKey) {
    queryClient.invalidateQueries({
      queryKey: [queryKey?.query, queryKey?.key],
    });
  }

  if (redirect) {
    redirect.router.push(redirect.routerPath);
  }
};
