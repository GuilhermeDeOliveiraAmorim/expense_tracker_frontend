import { getExpensesByCategoryPeriod } from "@/components/query_functions/qf.presenters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CategoryExpense } from "@/internal/presenters/get_expenses_by_category_period";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function GetExpensesByCategoryPeriodForm() {
  const { toast } = useToast();

  const [startDate, setStartDate] = useState("01012024");
  const [endDate, setEndDate] = useState("27092024");
  const [expensesCategories, setExpensesCategories] = useState<
    CategoryExpense[]
  >([]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    series: [],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    colors: ["#41B883"],
  });

  const {
    data: getExpensesByCategoryPeriodData,
    error: getExpensesByCategoryPeriodError,
    isLoading: getExpensesByCategoryPeriodLoading,
  } = useQuery({
    queryKey: [
      "get-total-expenses-for-period",
      "get-total-expenses-for-period",
    ],
    queryFn: () =>
      getExpensesByCategoryPeriod({ startDate: startDate, endDate: endDate }),
  });

  useEffect(() => {
    if (!getExpensesByCategoryPeriodLoading) {
      if (
        getExpensesByCategoryPeriodData &&
        getExpensesByCategoryPeriodData.expenses
      ) {
        setExpensesCategories(getExpensesByCategoryPeriodData.expenses);

        const categories = getExpensesByCategoryPeriodData.expenses.map(
          (expense) => expense.category_name
        );
        const dataSeries = getExpensesByCategoryPeriodData.expenses.map(
          (expense) => expense.total
        );
        const colors = getExpensesByCategoryPeriodData.expenses.map(
          (expense) => expense.category_color
        );

        setChartOptions((prevChartOptions) => ({
          ...prevChartOptions,
          series: [{ data: dataSeries }],
          xaxis: { categories },
          colors,
        }));
      } else {
        setExpensesCategories([]);
      }
    }
  }, [
    chartOptions,
    getExpensesByCategoryPeriodData,
    getExpensesByCategoryPeriodLoading,
  ]);

  if (getExpensesByCategoryPeriodError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by category and period",
      duration: 2500,
    });
    return;
  }

  if (getExpensesByCategoryPeriodLoading) {
    return (
      <div>
        <Skeleton className="w-[350px] h-[200px] rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2">
          <CardTitle className="text-sm">Total Expenses</CardTitle>
          <Icons.dollarSign className="w-4 h-4 text-gray-500" />
        </CardHeader>
        <CardContent className="flex flex-col justify-between w-full items-baseline">
          <ApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  );
}
