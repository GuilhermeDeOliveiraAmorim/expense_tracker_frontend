import SelectV2 from "../selects/select_v2";
import { useEffect, useState } from "react";
import { CategoriesByMonthAndYearChart } from "./categories_by_month_and_year_chart";
import { useMutation } from "@tanstack/react-query";
import { getExpensesByCategoryPeriod } from "@/components/query_functions/qf.presenters";
import { rangerDate } from "@/components/util/date.handler";
import {
  GetExpensesByCategoryPeriodInputDTO,
  GetExpensesByCategoryPeriodOutputDTO,
} from "@/internal/presenters/get_expenses_by_category_period";

type CategoriesByMonthAndYearProps = {
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
};

type CategoryExpense = {
  category_name: string;
  category_color: string;
  total: number;
};

type ChartData = {
  value: string;
  amount: number;
  fill: string;
};

type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

const convertData = (
  categoryExpenses: CategoryExpense[]
): { chartData: ChartData[]; chartConfig: ChartConfig } => {
  const chartData: ChartData[] = categoryExpenses.map((expense) => ({
    value: expense.category_name,
    amount: expense.total,
    fill: expense.category_color,
  }));

  const chartConfig: ChartConfig = categoryExpenses.reduce(
    (config, expense, index) => {
      const key = expense.category_name.toLowerCase();
      config[key] = {
        label: expense.category_name,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    },
    {} as ChartConfig
  );

  return { chartData, chartConfig };
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}${month}${year}`;
};

export default function CategoriesByMonthAndYear({
  months,
  years,
}: CategoriesByMonthAndYearProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryExpense[]>([]);
  const [startDate, setStartDate] = useState(
    rangerDate({
      firstDayOfMonth: true,
    })
  );
  const [endDate, setEndDate] = useState(
    rangerDate({
      today: true,
    })
  );

  const mutation = useMutation<
    GetExpensesByCategoryPeriodOutputDTO,
    Error,
    GetExpensesByCategoryPeriodInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getExpensesByCategoryPeriod,
    onSuccess: (output: GetExpensesByCategoryPeriodOutputDTO) => {
      if (output && output.expenses) {
        setCategories(output.expenses);
      } else {
        setCategories([]);
      }
    },
    onError: () => setCategories([]),
  });

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const start = new Date(`${selectedYear}-${selectedMonth}-01`);
      const end = new Date();

      const formattedStartDate = formatDate(start);
      const formattedEndDate = formatDate(end);

      if (formattedStartDate !== startDate || formattedEndDate !== endDate) {
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      }
    }
  }, [selectedYear, selectedMonth, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      mutation.mutate({
        startDate: startDate,
        endDate: endDate,
      });
    }
  }, [startDate, endDate, mutation]);

  const { chartData, chartConfig } = convertData(categories);

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md">
      <CategoriesByMonthAndYearChart
        data={chartData}
        chartConfig={chartConfig}
      />
      <div className="flex flex-row gap-2 p-2 w-full">
        <SelectV2
          label="Month"
          placeholder="Select month"
          onChange={(value) => {
            console.log("Selected month:", value);
            setSelectedMonth(value);
          }}
          options={months}
        />
        <SelectV2
          label="Year"
          placeholder="Select year"
          onChange={(value) => {
            console.log("Selected year:", value);
            setSelectedYear(value);
          }}
          options={years}
        />
      </div>
    </div>
  );
}
