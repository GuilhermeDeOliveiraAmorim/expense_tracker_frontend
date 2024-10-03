import {
  getMonthlyExpensesByCategoryYear,
  getMonthlyExpensesByTagYear,
} from "@/components/query_functions/qf.presenters";
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
  GetMonthlyExpensesByCategoryYearInputDTO,
  GetMonthlyExpensesByCategoryYearOutputDTO,
  MonthlyCategoryExpense,
} from "@/internal/presenters/get_monthly_expenses_by_category_year";
import {
  GetMonthlyExpensesByTagYearInputDTO,
  GetMonthlyExpensesByTagYearOutputDTO,
  MonthlyTagExpense,
} from "@/internal/presenters/get_monthly_expenses_by_tag_year";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bar, BarChart, LabelList, XAxis } from "recharts";

const transformCategoriesResponse = (data: MonthlyCategoryExpense[]) => {
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
};

const transformTagsResponse = (data: MonthlyTagExpense[]) => {
  const chartData = [];
  const chartConfig: Record<string, { label: string; color: string }> = {};

  for (const item of data) {
    const { month, year, tags } = item;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-15`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataPoint: any = { date: dateStr };

    for (const tag of tags) {
      const { tag_name, tag_color, total } = tag;

      dataPoint[tag_name.toLowerCase()] = total;

      if (!chartConfig[tag_name.toLowerCase()]) {
        chartConfig[tag_name.toLowerCase()] = {
          label: tag_name,
          color: tag_color,
        };
      }
    }

    chartData.push(dataPoint);
  }

  return { chartData, chartConfig };
};

export default function GetMonthlyExpensesByCategoryYearForm() {
  const [categories, setCategories] = useState<MonthlyCategoryExpense[]>([]);
  const [tags, setTags] = useState<MonthlyTagExpense[]>([]);
  const [yearsList, setYearsList] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [viewType, setViewType] = useState<"categories" | "tags">("categories");

  const {
    data: monthlyExpensesByCategoryData,
    error: monthlyExpensesByCategoryError,
    isLoading: monthlyExpensesByCategoryLoading,
  } = useQuery({
    queryKey: ["monthly-expenses-by-category", "monthly-expenses-by-category"],
    queryFn: () =>
      getMonthlyExpensesByCategoryYear({
        year: Number(selectedYear),
      }),
  });

  const {
    data: monthlyExpensesByTagData,
    error: monthlyExpensesByTagError,
    isLoading: monthlyExpensesByTagLoading,
  } = useQuery({
    queryKey: ["monthly-expenses-by-tag", "monthly-expenses-by-tag"],
    queryFn: () =>
      getMonthlyExpensesByTagYear({
        year: Number(selectedYear),
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

  useEffect(() => {
    if (!monthlyExpensesByTagLoading) {
      if (monthlyExpensesByTagData && monthlyExpensesByTagData.expenses) {
        setTags(monthlyExpensesByTagData?.expenses);
      } else {
        setTags([]);
      }
    }
  }, [monthlyExpensesByTagData, monthlyExpensesByTagLoading]);

  const mutationCategories = useMutation<
    GetMonthlyExpensesByCategoryYearOutputDTO,
    Error,
    GetMonthlyExpensesByCategoryYearInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getMonthlyExpensesByCategoryYear,
    onSuccess: (output: GetMonthlyExpensesByCategoryYearOutputDTO) => {
      setCategories(output?.expenses);
    },
    onError: () => setCategories([]),
  });

  const mutationTags = useMutation<
    GetMonthlyExpensesByTagYearOutputDTO,
    Error,
    GetMonthlyExpensesByTagYearInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getMonthlyExpensesByTagYear,
    onSuccess: (output: GetMonthlyExpensesByTagYearOutputDTO) => {
      setTags(output?.expenses);
    },
    onError: () => setTags([]),
  });

  const handleChangeYear = (year: number) => {
    if (viewType === "categories") {
      setSelectedYear(year.toString());

      mutationCategories.mutate({
        year: year,
      });
    } else {
      setSelectedYear(year.toString());

      mutationTags.mutate({
        year: year,
      });
    }
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

  if (monthlyExpensesByTagError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by tag",
      duration: 2500,
    });
    return;
  }

  const { chartData, chartConfig } =
    viewType === "categories"
      ? transformCategoriesResponse(categories)
      : transformTagsResponse(tags);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2 gap-4">
        <CardTitle className="text-sm">Expenses by month</CardTitle>
        <Select
          name="viewType"
          onValueChange={(value) => setViewType(value as "categories" | "tags")}
          value={viewType}
          aria-label="View Type"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>View Type</SelectLabel>
              <SelectItem value="categories">Categories</SelectItem>
              <SelectItem value="tags">Tags</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name="year"
          key={selectedYear}
          onValueChange={(value) => handleChangeYear(Number(value))}
          value={selectedYear.toString()}
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
