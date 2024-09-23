"use client";

import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import Delete from "../actions/delete";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { deleteExpense, getExpenses } from "../query_functions/qf.expense";
import { Skeleton } from "../ui/skeleton";
import { Expense } from "@/internal/domain/expense";
import { DataTable } from "../tables/expense/expensetable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { PageContentProps } from "@/props_types/props.types";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.getValue("amount"));

      return <div className="font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notes
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("notes")}</div>,
  },
  {
    accessorKey: "expense_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("expense_date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Delete
          entity_id={row.original.id}
          mutationKey={"delete-expense"}
          mutationFn={deleteExpense}
          queryName={"get-expenses"}
          entityIdKey="expense_id"
        />
      );
    },
  },
];

export default function ExpensesContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

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
                    data={expenses}
                    columns={columns}
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
