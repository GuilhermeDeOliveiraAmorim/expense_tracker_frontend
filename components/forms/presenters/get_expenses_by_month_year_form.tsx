import { getExpensesByMonthYear } from "@/components/query_functions/qf.presenters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import MonthlyExpensesCard from "@/components/ui/monthlyexpensecard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Card className="w-full">
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
          <div className="flex flex-row gap-4">
            <Select
              name="month"
              key={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
              value={selectedMonth}
              aria-label="Months listing"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              name="year"
              key={selectedYear}
              onValueChange={(value) => setSelectedYear(Number(value))}
              value={selectedYear.toString()}
              aria-label="Years listing"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Years</SelectLabel>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleChangeDate()}
            >
              <Icons.refreshCcw className="w-4 h-4" />
            </Button>
          </div>
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
