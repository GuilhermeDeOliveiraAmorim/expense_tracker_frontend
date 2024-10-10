import { getExpensesByMonthYear } from "@/components/query_functions/qf.presenters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const {
    data: expensesByMonthYearData,
    error: expensesByMonthYearError,
    isLoading: expensesByMonthYearLoading,
  } = useQuery({
    queryKey: ["expenses-by-month-year"],
    queryFn: () =>
      getExpensesByMonthYear({
        month: "10",
        year: 2024,
      }),
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

  if (expensesByMonthYearError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by category",
      duration: 2500,
    });
    return;
  }

  console.log(expensesByMonthYearData);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col w-full pb-4">
        <CardTitle className="text-sm">Monthly Expenses</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {month}, {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <div className="grid grid-cols-7 gap-4 w-full">
          {weeks?.map((week) =>
            week.days.map((day) => (
              <div
                key={day.day}
                className="flex flex-col justify-between items-center w-full text-center text-xs font-bold text-gray-600 border border-gray-300 rounded-t-lg"
              >
                <div className="flex flex-col justify-between items-center w-full">
                  <div className="flex flex-row justify-between items-center w-full border-gray-300 border-b p-2 bg-gray-100 rounded-t-lg">
                    <span className="text-center text-xs font-semibold text-gray-500">
                      {day.day}
                    </span>
                    <span className="text-center text-xs text-gray-500">
                      {day.day_name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center w-full p-[2px] gap-[2px] h-full">
                  {day.tags.map((tag) => (
                    <div
                      key={tag.name}
                      style={{ backgroundColor: tag.color }}
                      className="w-full flex flex-col justify-center items-center pt-1 pb-1 text-white rounded-sm"
                    >
                      {tag.name} (R$ {tag.total.toFixed(2).replace(".", ",")})
                    </div>
                  ))}
                </div>

                <div className="text-center font-bold pt-1 pb-1 text-gray-900 w-full bg-gray-100 border-gray-300 border-t">
                  R$ {day.total.toFixed(2).replace(".", ",")}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
