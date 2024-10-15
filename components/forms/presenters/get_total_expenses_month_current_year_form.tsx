"use client";

import DateSelector from "@/components/ui/dateselector";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  GetTotalExpensesMonthCurrentYearInputDTO,
  GetTotalExpensesMonthCurrentYearOutputDTO,
  MonthCurrentYear,
} from "@/internal/presenters/get_total_expenses_month_current_year";
import { getTotalExpensesMonthCurrentYear } from "@/components/query_functions/qf.presenters";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";

const chartConfig = {
  total: {
    label: "Total: ",
  },
} satisfies ChartConfig;

export function GetTotalExpensesMonthCurrentYearForm() {
  const [monthsCurrentYear, setMonthsCurrentYear] = useState<
    MonthCurrentYear[]
  >([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const {
    data: totalExpensesMonthCurrentYearData,
    error: totalExpensesMonthCurrentYearError,
    isLoading: totalExpensesMonthCurrentYearLoading,
  } = useQuery({
    queryKey: [
      "total-expenses-month-current-year",
      "total-expenses-month-current-year",
    ],
    queryFn: () => getTotalExpensesMonthCurrentYear({ year: year }),
  });

  useEffect(() => {
    if (!totalExpensesMonthCurrentYearLoading) {
      if (totalExpensesMonthCurrentYearData != undefined) {
        setTotalAmount(
          totalExpensesMonthCurrentYearData?.expenses_month_current_year.total
        );
        setMonthsCurrentYear(
          totalExpensesMonthCurrentYearData?.expenses_month_current_year.months
        );
        setAvailableYears(
          totalExpensesMonthCurrentYearData?.expenses_month_current_year
            .available_years
        );
        setYear(
          totalExpensesMonthCurrentYearData?.expenses_month_current_year.year
        );
      } else {
        setTotalAmount(0);
        setMonthsCurrentYear([]);
        setAvailableYears([]);
      }
    }
  }, [totalExpensesMonthCurrentYearData, totalExpensesMonthCurrentYearLoading]);

  const mutation = useMutation<
    GetTotalExpensesMonthCurrentYearOutputDTO,
    Error,
    GetTotalExpensesMonthCurrentYearInputDTO
  >({
    mutationKey: ["total-expenses-month-current-year"],
    mutationFn: getTotalExpensesMonthCurrentYear,
    onSuccess: (output: GetTotalExpensesMonthCurrentYearOutputDTO) => {
      setTotalAmount(output?.expenses_month_current_year.total);
      setMonthsCurrentYear(output?.expenses_month_current_year.months);
      setAvailableYears(output?.expenses_month_current_year.available_years);
      setYear(output?.expenses_month_current_year.year);
    },
    onError: () => setTotalAmount(0),
  });

  const handleChangeDate = () => {
    const input: GetTotalExpensesMonthCurrentYearInputDTO = {
      year: selectedYear,
    };

    if (selectedYear) {
      const delay = setTimeout(() => {}, 300);
      mutation.mutate(input);
      return () => clearTimeout(delay);
    }
  };

  if (totalExpensesMonthCurrentYearError) {
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
        <div className="flex flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-sm">Expenses per month</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              <div>
                {year}, R$ {totalAmount.toFixed(2).replace(".", ",")}
              </div>
            </CardDescription>
          </div>
          <DateSelector
            year={{
              onYearChange: (value) => setSelectedYear(Number(value)),
              selectedYear: selectedYear,
              years: availableYears,
            }}
            onRefresh={() => handleChangeDate()}
          />
        </div>
      </CardHeader>
      <CardContent>
        {availableYears.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={monthsCurrentYear}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel className="bg-white" />}
              />
              <Bar dataKey="total" fill="var(--color-total)" radius={8} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="pt-[10px] pb-[10px] w-full flex h-full justify-center items-center text-[#e5e7eb]">
            <Icons.fileX2 />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
