import {
  getExpensesByMonthYear,
  getTotalExpensesForCurrentMonth,
} from "@/components/query_functions/qf.presenters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthlyExpensesCard from "@/components/ui/monthlyexpensecard";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type ExpenseTag = {
  name: string;
  color: string;
  total: number;
};

export type DayExpense = {
  day: string;
  day_name: string;
  total: number;
  tags: ExpenseTag[];
};

export type WeekExpenses = {
  week: number;
  days: DayExpense[];
};

export type MonthExpenses = {
  month: string;
  year: number;
  weeks: WeekExpenses[];
};

export type GetExpensesByMonthYearInputDTO = {
  month: string;
  year: number;
};

export type GetExpensesByMonthYearOutputDTO = {
  expenses: MonthExpenses;
};

export default function GetExpensesByMonthYearForm() {
  const [weeks, setWeeks] = useState<WeekExpenses[]>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<number>();
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    data: expensesByMonthYearData,
    error: expensesByMonthYearError,
    isLoading: expensesByMonthYearLoading,
  } = useQuery({
    queryKey: ["expenses-by-month-year"],
    queryFn: () =>
      getExpensesByMonthYear({
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        year: new Date().getFullYear(),
      }),
  });

  const {
    data: getTotalExpensesForCurrentMonthData,
    error: getTotalExpensesForCurrentMonthError,
    isLoading: getTotalExpensesForCurrentMonthLoading,
  } = useQuery({
    queryKey: [
      "total-expenses-for-current-month",
      "total-expenses-for-current-month",
    ],
    queryFn: () => getTotalExpensesForCurrentMonth({}),
  });

  useEffect(() => {
    if (expensesByMonthYearData && expensesByMonthYearData.expenses) {
      setWeeks(expensesByMonthYearData.expenses.weeks);
      setMonth(expensesByMonthYearData.expenses.month);
      setYear(expensesByMonthYearData.expenses.year);
    } else {
      setWeeks(undefined);
      setMonth(undefined);
      setYear(undefined);
    }
  }, [expensesByMonthYearData, expensesByMonthYearLoading]);

  useEffect(() => {
    if (!getTotalExpensesForCurrentMonthLoading) {
      if (getTotalExpensesForCurrentMonthData != undefined) {
        setTotalAmount(getTotalExpensesForCurrentMonthData?.total_expenses);
      } else {
        setTotalAmount(0);
      }
    }
  }, [
    getTotalExpensesForCurrentMonthData,
    getTotalExpensesForCurrentMonthLoading,
  ]);

  if (expensesByMonthYearError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by month",
      duration: 2500,
    });
    return;
  }

  if (getTotalExpensesForCurrentMonthError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch total amount",
      duration: 2500,
    });
    return;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col w-full pb-4">
        <CardTitle className="text-sm">Monthly Expenses</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {month}, {year}, R$ {totalAmount.toFixed(2).replace(".", ",")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <MonthlyExpensesCard weeks={weeks} />
      </CardContent>
    </Card>
  );
}
