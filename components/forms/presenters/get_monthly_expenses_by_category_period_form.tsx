import { getMonthlyExpensesByCategoryPeriod } from "@/components/query_functions/qf.presenters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  GetMonthlyExpensesByCategoryPeriodInputDTO,
  GetMonthlyExpensesByCategoryPeriodOutputDTO,
  MonthlyCategoryExpense,
} from "@/internal/presenters/get_monthly_expenses_by_category_period";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bar, BarChart, LabelList, XAxis } from "recharts";

function transformApiResponse(data: MonthlyCategoryExpense[]) {
  const chartData = [];
  const chartConfig: Record<string, { label: string; color: string }> = {
    expenses: {
      label: "Expenses per month",
      color: "#000000",
    },
  };

  const monthToIndex = (month: string) => {
    return new Date(`${month} 1, 2000`).getMonth() + 1;
  };

  for (const item of data) {
    const { month, year, categories } = item;
    const monthIndex = monthToIndex(month);
    const dateStr = `${year}-${String(monthIndex).padStart(2, "0")}-15`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataPoint: any = { date: dateStr };

    for (const category of categories) {
      const { category_name, category_color, total } = category;

      dataPoint[category_name.toLowerCase()] = total;

      if (!chartConfig[category_name.toLowerCase()]) {
        chartConfig[category_name.toLowerCase()] = {
          label: category_name,
          color: category_color,
        };
      }
    }

    chartData.push(dataPoint);
  }

  return { chartData, chartConfig };
}

export default function GetMonthlyExpensesByCategoryPeriodForm() {
  const [categories, setCategories] = useState<MonthlyCategoryExpense[]>([]);
  const [yearsList, setYearsList] = useState<number[]>([]);
  const [year, setYear] = useState("2024");

  const {
    data: monthlyExpensesByCategoryData,
    error: monthlyExpensesByCategoryError,
    isLoading: monthlyExpensesByCategoryLoading,
  } = useQuery({
    queryKey: ["monthly-expenses-by-category", "monthly-expenses-by-category"],
    queryFn: () =>
      getMonthlyExpensesByCategoryPeriod({
        year: Number(year),
      }),
  });

  useEffect(() => {
    if (!monthlyExpensesByCategoryLoading) {
      if (
        monthlyExpensesByCategoryData &&
        monthlyExpensesByCategoryData.expenses
      ) {
        setCategories(monthlyExpensesByCategoryData?.expenses);
        setYearsList(monthlyExpensesByCategoryData?.available_years);
      } else {
        setCategories([]);
        setYearsList([]);
      }
    }
  }, [monthlyExpensesByCategoryData, monthlyExpensesByCategoryLoading]);

  const mutation = useMutation<
    GetMonthlyExpensesByCategoryPeriodOutputDTO,
    Error,
    GetMonthlyExpensesByCategoryPeriodInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getMonthlyExpensesByCategoryPeriod,
    onSuccess: (output: GetMonthlyExpensesByCategoryPeriodOutputDTO) => {
      setCategories(output?.expenses);
    },
    onError: () => setCategories([]),
  });

  const handleChangeYear = (year: number) => {
    setYear(year.toString());

    const input: GetMonthlyExpensesByCategoryPeriodInputDTO = {
      year: year,
    };

    mutation.mutate(input);
  };

  if (monthlyExpensesByCategoryError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by category",
      duration: 2500,
    });
    return;
  }

  const { chartData, chartConfig } = transformApiResponse(categories);

  console.log("categories", categories);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2">
        <CardTitle className="text-sm">Expenses by month</CardTitle>
        <Select
          name="year"
          key={year}
          onValueChange={(value) => handleChangeYear(Number(value))}
          value={year.toString()}
          aria-label="Years listing"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {yearsList?.map((year: number) => (
                <SelectItem key={year} value={year.toString()}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {year}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col justify-between w-full items-baseline">
        {categories.length === 0 ? (
          <div>No expenses found</div>
        ) : (
          <div className="flex flex-row justify-between w-full items-baseline">
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                    });
                  }}
                />
                {Object.entries(chartConfig).map(([key, config]) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={config.color}>
                    <LabelList
                      dataKey={key}
                      position="center"
                      offset={8}
                      fill="#ffffff"
                      fontSize={12}
                    />
                  </Bar>
                ))}
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="expenses"
                      indicator="line"
                      className="bg-white"
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
