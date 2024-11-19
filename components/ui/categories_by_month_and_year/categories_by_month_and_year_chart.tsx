"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  value: string;
  amount: number;
  fill: string;
};

type ChartDataConfig = {
  data: ChartData[];
  chartConfig: ChartConfig;
};

export function CategoriesByMonthAndYearChart({
  data,
  chartConfig,
}: ChartDataConfig) {
  return (
    <ChartContainer config={chartConfig} className="p-2">
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 16,
        }}
      >
        <YAxis
          dataKey="value"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="amount" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="bg-white" />}
        />
        <Bar dataKey="amount" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
