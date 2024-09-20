"use client";

import { deleteExpense } from "@/components/query_functions/qf.expense";
import { Icons } from "@/components/ui/icons";
import { displayNotification } from "@/components/util/notification.handler";
import {
  DeleteExpenseInputDTO,
  DeleteExpenseOutputDTO,
} from "@/internal/usecases/delete_expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteExpenseProps = {
  user_id: string;
  expense_id: string;
};

export default function DeleteExpense({
  user_id,
  expense_id,
}: DeleteExpenseProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    DeleteExpenseOutputDTO,
    Error,
    DeleteExpenseInputDTO
  >({
    mutationKey: ["delete-expense"],
    mutationFn: deleteExpense,
    onSuccess: (output: DeleteExpenseOutputDTO) =>
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
          query: "expenses",
          key: user_id,
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

  const deleteExpenseHandler = async () => {
    mutation.mutateAsync({ user_id, expense_id });
  };

  return (
    <Icons.trash
      onClick={deleteExpenseHandler}
      className="w-4 text-red-600 cursor-pointer"
    />
  );
}
