"use client";

import { Icons } from "@/components/ui/icons";
import { displayNotification } from "@/components/util/notification.handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationProps<InputDTO, OutputDTO> = {
  entity_id: string;
  entityIdKey: keyof InputDTO;
  mutationKey: string;
  queryName: string;
  mutationFn: (input: InputDTO) => Promise<OutputDTO>;
};

export default function Delete<InputDTO, OutputDTO>({
  entity_id,
  entityIdKey,
  mutationKey,
  queryName,
  mutationFn,
}: MutationProps<InputDTO, OutputDTO>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<OutputDTO, Error, InputDTO>({
    mutationKey: [mutationKey],
    mutationFn: mutationFn,
    onSuccess: (output: OutputDTO) =>
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
          query: queryName,
          key: queryName,
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

  const handleMutation = async () => {
    const input = {
      [entityIdKey]: entity_id,
    } as InputDTO;

    await mutation.mutateAsync(input);
  };

  return (
    <Icons.trash
      onClick={handleMutation}
      className="w-4 text-red-600 cursor-pointer"
    />
  );
}
