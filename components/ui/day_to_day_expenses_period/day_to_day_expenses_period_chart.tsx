"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "../amount_month_by_month_in_a_year/amount_month_by_month_in_a_year_chart";

const chartConfig = {
  amount: {
    label: "Amount:",
    color: "#134074",
  },
} satisfies ChartConfig;

type DayToDayExpensesPeriodChartProps = {
  data: ChartData;
};

export function DayToDayExpensesPeriodChart({
  data,
}: DayToDayExpensesPeriodChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="value"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="line" className="bg-white" />
          }
        />
        <Area
          dataKey="amount"
          type="natural"
          fill="#134074"
          fillOpacity={0.4}
          stroke="#134074"
        />
      </AreaChart>
    </ChartContainer>
  );
}
