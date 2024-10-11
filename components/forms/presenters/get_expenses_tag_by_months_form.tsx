"use client";

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
import { useState } from "react";
import DateSelector from "@/components/ui/dateselector";
import { months } from "@/components/util/date.handler";

export const description = "A bar chart";

const chartData = [
  { month: "January", total: 186.45 },
  { month: "February", total: 305.45 },
  { month: "March", total: 237.78 },
  { month: "April", total: 73.55 },
  { month: "May", total: 209.05 },
  { month: "June", total: 214.56 },
  { month: "July", total: 186.54 },
  { month: "August", total: 305.89 },
  { month: "September", total: 237.62 },
  { month: "October", total: 73.15 },
  { month: "November", total: 209.69 },
  { month: "December", total: 214.32 },
];

const chartConfig = {
  total: {
    label: "Total Expenses: ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GetExpensesTagByMonthsForm() {
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

  const handleChangeDate = () => {
    if (selectedMonth && selectedYear) {
      const delay = setTimeout(() => {}, 300);

      return () => clearTimeout(delay);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col w-full pb-4">
        <div className="flex flex-col justify-between gap-4">
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
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
