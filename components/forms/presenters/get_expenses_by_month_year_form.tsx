import { getExpensesByMonthYear } from "@/components/query_functions/qf.presenters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateSelector from "@/components/ui/dateselector";
import { Icons } from "@/components/ui/icons";
import MonthlyExpensesCard from "@/components/ui/monthlyexpensecard";
import { months } from "@/components/util/date.handler";
import { toast } from "@/hooks/use-toast";
import {
  GetExpensesByMonthYearInputDTO,
  GetExpensesByMonthYearOutputDTO,
  WeekExpenses,
} from "@/internal/presenters/get_expenses_by_month_year";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function GetExpensesByMonthYearForm() {
  const [weeks, setWeeks] = useState<WeekExpenses[]>([]);
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [
    isLoadingExpensesByMonthYearData,
    setIsLoadingExpensesByMonthYearData,
  ] = useState(false);

  const {
    data: expensesByMonthYearData,
    error: expensesByMonthYearError,
    isLoading: expensesByMonthYearLoading,
  } = useQuery({
    queryKey: ["expenses-by-month-year"],
    queryFn: () =>
      getExpensesByMonthYear({
        month: selectedMonth,
        year: selectedYear,
      }),
  });

  useEffect(() => {
    if (expensesByMonthYearData && expensesByMonthYearData.expenses) {
      setWeeks(expensesByMonthYearData.expenses.weeks);
      setMonth(expensesByMonthYearData.expenses.month);
      setYear(expensesByMonthYearData.expenses.year);
      setTotalAmount(expensesByMonthYearData.expenses.total_expenses);
    } else {
      setWeeks([]);
      setMonth("");
      setYear(0);
    }
  }, [expensesByMonthYearData, expensesByMonthYearLoading]);

  const mutation = useMutation<
    GetExpensesByMonthYearOutputDTO,
    Error,
    GetExpensesByMonthYearInputDTO
  >({
    mutationKey: ["total-expenses-for-current-month"],
    mutationFn: getExpensesByMonthYear,
    onSuccess: (output: GetExpensesByMonthYearOutputDTO) => {
      setWeeks(output.expenses.weeks);
      setMonth(output.expenses.month);
      setYear(output.expenses.year);
      setTotalAmount(output.expenses.total_expenses);
    },
    onError: () => setWeeks([]),
  });

  const handleChangeDate = () => {
    if (selectedMonth && selectedYear) {
      setIsLoadingExpensesByMonthYearData(true);

      const delay = setTimeout(() => {
        mutation.mutate({
          month: selectedMonth,
          year: selectedYear,
        });
        setIsLoadingExpensesByMonthYearData(false);
      }, 300);

      return () => clearTimeout(delay);
    }
  };

  if (expensesByMonthYearError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by month",
      duration: 2500,
    });
    return;
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col w-full pb-4">
        <div className="flex flex-row justify-between">
          <div>
            <CardTitle className="text-sm">Monthly Expenses</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              <div>
                {month}, {year}, R$ {totalAmount.toFixed(2).replace(".", ",")}
              </div>
            </CardDescription>
          </div>
          <DateSelector
            months={months}
            selectedMonth={selectedMonth}
            onMonthChange={(value) => setSelectedMonth(value)}
            selectedYear={selectedYear}
            onYearChange={(value) => setSelectedYear(Number(value))}
            onRefresh={() => handleChangeDate()}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        {!isLoadingExpensesByMonthYearData ? (
          <MonthlyExpensesCard weeks={weeks} />
        ) : (
          <div className="pt-[10px] pb-[10px] w-full flex justify-center items-center">
            <Icons.spinner className="w-4 h-4 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
