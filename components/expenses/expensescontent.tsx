"use client";

import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/auth";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../query_functions/qf.expense";
import { Skeleton } from "../ui/skeleton";
import { Expense } from "@/internal/domain/expense";

export default function ExpensesContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: expensesData,
    error: expensesError,
    isLoading: expensesLoading,
  } = useQuery({
    queryKey: ["expenses", userId],
    queryFn: () => getExpenses(input),
    enabled: !!userId,
  });

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const access_token = sessionStorage.getItem("access_token");

    if (
      access_token === null ||
      access_token === undefined ||
      user_id === null ||
      user_id === undefined ||
      access_token === "" ||
      access_token === "" ||
      user_id === "" ||
      user_id === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 2500,
      });

      router.push("/login");

      return;
    }

    setUserId(user_id);
    setIsLoading(false);
  }, [router]);

  const input: { user_id: string } = {
    user_id: userId,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (expensesError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses",
      duration: 2500,
    });
    return;
  }

  let expenses: Expense[] = [];

  if (expensesData?.expenses === null) {
    expenses = [];
  } else {
    expenses = expensesData?.expenses || [];
  }

  return (
    <>
      {header ? header : ""}

      <main className="flex flex-1 bg-gray-100 pl-48 pr-48 pt-6 pb-6 gap-6 w-full">
        <div className="flex flex-col gap-6">
          <AddExpenseForm user_id={userId} />
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Color</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expensesLoading ? (
                    <Skeleton className="w-full h-[20px] rounded-full" />
                  ) : (
                    expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium w-full">
                          {expense.amount}
                        </TableCell>
                        <TableCell className="text-right">
                          {expense.active ? "Atctive" : "Inactive"}
                        </TableCell>
                        <TableCell className="text-right">
                          {expense.notes}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>

      {footer ? footer : ""}
    </>
  );
}
