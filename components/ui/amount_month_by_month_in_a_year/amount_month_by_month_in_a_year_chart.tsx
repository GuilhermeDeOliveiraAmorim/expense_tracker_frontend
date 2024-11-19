"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartDataItem = {
  month: string;
  amount: number;
};

export type ChartData = ChartDataItem[];

const chartConfig = {
  amount: {
    label: "Amount:",
    color: "#134074",
  },
} satisfies ChartConfig;

type AmountMonthByMonthInAYearChartProps = {
  years: Array<{ value: string; label: string }>;
  data: ChartData;
};

export default function AmountMonthByMonthInAYearChart({
  data,
}: AmountMonthByMonthInAYearChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
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
        <Bar dataKey="amount" fill="#134074" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
