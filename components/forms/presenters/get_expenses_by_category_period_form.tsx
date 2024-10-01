"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExpensesByCategoryPeriod } from "@/components/query_functions/qf.presenters";
import { toast } from "@/hooks/use-toast";
import { formatDateDdMmYyyy, rangerDate } from "@/components/util/date.handler";
import { format } from "date-fns";
import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "@/internal/presenters/get_expenses_by_category_period";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ChartData = {
  name: string;
  total: number;
  fill: string;
};

const chartConfig = {
  total: {
    label: "Total",
  },
} satisfies ChartConfig;

export default function GetExpensesByCategoryPeriodForm() {
  const [categories, setCategories] = useState<ChartData[]>([]);
  const [startDate, setStartDate] = useState(
    rangerDate({
      last90Days: true,
    })
  );
  const [endDate, setEndDate] = useState(
    rangerDate({
      today: true,
    })
  );

  const {
    data: expensesByCategoryData,
    error: expensesByCategoryError,
    isLoading: expensesByCategoryLoading,
  } = useQuery({
    queryKey: ["expenses-by-category", "expenses-by-category"],
    queryFn: () =>
      getExpensesByCategoryPeriod({
        startDate: startDate,
        endDate: endDate,
      }),
  });

  useEffect(() => {
    if (!expensesByCategoryLoading) {
      if (expensesByCategoryData && expensesByCategoryData.expenses) {
        setCategories(
          expensesByCategoryData?.expenses.map((category) => {
            return {
              name: category.category_name,
              total: category.total,
              fill: category.category_color,
            } as ChartData;
          })
        );
      } else {
        setCategories([]);
      }
    }
  }, [expensesByCategoryData, expensesByCategoryLoading]);

  const mutation = useMutation<
    GetExpensesByCategoryPeriodOutputDTO,
    Error,
    GetExpensesByCategoryPeriodInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getExpensesByCategoryPeriod,
    onSuccess: (output: GetExpensesByCategoryPeriodOutputDTO) => {
      setCategories(
        output?.expenses.map((category) => {
          return {
            name: category.category_name,
            total: category.total,
            fill: category.category_color,
          } as ChartData;
        })
      );
    },
    onError: () => setCategories([]),
  });

  const handleChangeDates = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);

    const input: GetExpensesByCategoryPeriodInputDTO = {
      startDate: startDate,
      endDate: endDate,
    };

    mutation.mutate(input);
  };

  if (expensesByCategoryError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by category",
      duration: 2500,
    });
    return;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2">
        <CardTitle className="text-sm">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between w-full items-baseline">
        {categories.length === 0 ? (
          <div>No expenses found</div>
        ) : (
          <div className="w-full">
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart
                accessibilityLayer
                data={categories}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <XAxis dataKey="total" type="number" hide />
                <Bar dataKey="total" layout="vertical" radius={4}>
                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    fontSize={12}
                    fill="#9c9c9c"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>

            <div className="flex flex-row justify-between w-full items-baseline">
              <p className="text-xs text-muted-foreground">
                {formatDateDdMmYyyy(startDate) +
                  " - " +
                  formatDateDdMmYyyy(endDate)}
              </p>

              <ToggleGroup type="single">
                <ToggleGroupItem
                  onClick={() =>
                    handleChangeDates(
                      format(
                        new Date(
                          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                        ),
                        "ddMMyyyy"
                      ),
                      format(new Date(), "ddMMyyyy")
                    )
                  }
                  value="07"
                  aria-label="07 days"
                  className="text-sm text-gray-500 w-3 h-6"
                >
                  07
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={() =>
                    handleChangeDates(
                      format(
                        new Date(
                          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                        ),
                        "ddMMyyyy"
                      ),
                      format(new Date(), "ddMMyyyy")
                    )
                  }
                  value="30"
                  aria-label="30 days"
                  className="text-sm text-gray-500 w-3 h-6"
                >
                  30
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={() =>
                    handleChangeDates(
                      format(
                        new Date(
                          new Date().getTime() - 90 * 24 * 60 * 60 * 1000
                        ),
                        "ddMMyyyy"
                      ),
                      format(new Date(), "ddMMyyyy")
                    )
                  }
                  value="90"
                  aria-label="90 days"
                  className="text-sm text-gray-500 w-3 h-6"
                >
                  90
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
