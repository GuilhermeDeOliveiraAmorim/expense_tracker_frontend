"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "01", amount: 186 },
  { day: "02", amount: 374 },
  { day: "03", amount: 237 },
  { day: "04", amount: 73 },
  { day: "05", amount: 209 },
  { day: "06", amount: 214 },
  { day: "07", amount: 45 },
  { day: "08", amount: 305 },
  { day: "09", amount: 73 },
  { day: "10", amount: 209 },
  { day: "11", amount: 45 },
  { day: "12", amount: 42 },
  { day: "13", amount: 214 },
  { day: "14", amount: 186 },
  { day: "15", amount: 305 },
  { day: "16", amount: 785 },
  { day: "17", amount: 209 },
  { day: "18", amount: 57 },
  { day: "19", amount: 186 },
  { day: "20", amount: 123 },
  { day: "21", amount: 186 },
  { day: "22", amount: 305 },
  { day: "23", amount: 237 },
  { day: "24", amount: 73 },
  { day: "25", amount: 209 },
  { day: "26", amount: 214 },
  { day: "27", amount: 186 },
  { day: "28", amount: 305 },
  { day: "29", amount: 73 },
  { day: "30", amount: 209 },
  { day: "31", amount: 214 },
];

const chartConfig = {
  amount: {
    label: "Amount:",
    color: "#134074",
  },
} satisfies ChartConfig;

export function ExpensesByPeriodChart() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
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
