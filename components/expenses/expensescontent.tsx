"use client";

import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { Expense } from "@/internal/domain/expense";
import { DataTable } from "../tables/expense/expensetable";
import { PageContentProps } from "@/props_types/props.types";
import { getExpenses } from "../query_functions/qf.expense";
import { columnsExpenses } from "../util/table.handler";

export default function ExpensesContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const {
    data: expensesData,
    error: expensesError,
    isLoading: expensesLoading,
  } = useQuery({
    queryKey: ["get-expenses", "get-expenses"],
    queryFn: () => getExpenses({}),
  });

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    if (
      access_token === null ||
      access_token === undefined ||
      access_token === "" ||
      access_token === ""
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

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (!expensesLoading) {
      if (expensesData != undefined) {
        setExpenses(expensesData?.expenses);
      } else {
        setExpenses([]);
      }
    }
  }, [expensesData, expensesLoading]);

  if (expensesError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses",
      duration: 2500,
    });
    return;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {header ? header : ""}

      <main className="flex flex-1 bg-gray-100 pl-48 pr-48 pt-6 pb-6 gap-6 w-full">
        <div className="flex flex-col gap-6">
          <AddExpenseForm />
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                {expensesLoading ? (
                  <Skeleton className="w-full h-[20px] rounded-full" />
                ) : (
                  <DataTable
                    data={expenses || []}
                    columns={columnsExpenses}
                    filterColumnName="notes"
                    filterPlaceholder="Filter by notes"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {footer ? footer : ""}
    </>
  );
}
