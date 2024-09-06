"use client";
import * as React from "react";
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
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", receipts: 222, expenses: 150 },
  { date: "2024-04-02", receipts: 97, expenses: 180 },
  { date: "2024-04-03", receipts: 167, expenses: 120 },
  { date: "2024-04-04", receipts: 242, expenses: 260 },
  { date: "2024-04-05", receipts: 373, expenses: 290 },
  { date: "2024-04-06", receipts: 301, expenses: 340 },
  { date: "2024-04-07", receipts: 245, expenses: 180 },
  { date: "2024-04-08", receipts: 409, expenses: 320 },
  { date: "2024-04-09", receipts: 59, expenses: 110 },
  { date: "2024-04-10", receipts: 261, expenses: 190 },
  { date: "2024-04-11", receipts: 327, expenses: 350 },
  { date: "2024-04-12", receipts: 292, expenses: 210 },
  { date: "2024-04-13", receipts: 342, expenses: 380 },
  { date: "2024-04-14", receipts: 137, expenses: 220 },
  { date: "2024-04-15", receipts: 120, expenses: 170 },
  { date: "2024-04-16", receipts: 138, expenses: 190 },
  { date: "2024-04-17", receipts: 446, expenses: 360 },
  { date: "2024-04-18", receipts: 364, expenses: 410 },
  { date: "2024-04-19", receipts: 243, expenses: 180 },
  { date: "2024-04-20", receipts: 89, expenses: 150 },
  { date: "2024-04-21", receipts: 137, expenses: 200 },
  { date: "2024-04-22", receipts: 224, expenses: 170 },
  { date: "2024-04-23", receipts: 138, expenses: 230 },
  { date: "2024-04-24", receipts: 387, expenses: 290 },
  { date: "2024-04-25", receipts: 215, expenses: 250 },
  { date: "2024-04-26", receipts: 75, expenses: 130 },
  { date: "2024-04-27", receipts: 383, expenses: 420 },
  { date: "2024-04-28", receipts: 122, expenses: 180 },
  { date: "2024-04-29", receipts: 315, expenses: 240 },
  { date: "2024-04-30", receipts: 454, expenses: 380 },
  { date: "2024-05-01", receipts: 165, expenses: 220 },
  { date: "2024-05-02", receipts: 293, expenses: 310 },
  { date: "2024-05-03", receipts: 247, expenses: 190 },
  { date: "2024-05-04", receipts: 385, expenses: 420 },
  { date: "2024-05-05", receipts: 481, expenses: 390 },
  { date: "2024-05-06", receipts: 498, expenses: 520 },
  { date: "2024-05-07", receipts: 388, expenses: 300 },
  { date: "2024-05-08", receipts: 149, expenses: 210 },
  { date: "2024-05-09", receipts: 227, expenses: 180 },
  { date: "2024-05-10", receipts: 293, expenses: 330 },
  { date: "2024-05-11", receipts: 335, expenses: 270 },
  { date: "2024-05-12", receipts: 197, expenses: 240 },
  { date: "2024-05-13", receipts: 197, expenses: 160 },
  { date: "2024-05-14", receipts: 448, expenses: 490 },
  { date: "2024-05-15", receipts: 473, expenses: 380 },
  { date: "2024-05-16", receipts: 338, expenses: 400 },
  { date: "2024-05-17", receipts: 499, expenses: 420 },
  { date: "2024-05-18", receipts: 315, expenses: 350 },
  { date: "2024-05-19", receipts: 235, expenses: 180 },
  { date: "2024-05-20", receipts: 177, expenses: 230 },
  { date: "2024-05-21", receipts: 82, expenses: 140 },
  { date: "2024-05-22", receipts: 81, expenses: 120 },
  { date: "2024-05-23", receipts: 252, expenses: 290 },
  { date: "2024-05-24", receipts: 294, expenses: 220 },
  { date: "2024-05-25", receipts: 201, expenses: 250 },
  { date: "2024-05-26", receipts: 213, expenses: 170 },
  { date: "2024-05-27", receipts: 420, expenses: 460 },
  { date: "2024-05-28", receipts: 233, expenses: 190 },
  { date: "2024-05-29", receipts: 78, expenses: 130 },
  { date: "2024-05-30", receipts: 340, expenses: 280 },
  { date: "2024-05-31", receipts: 178, expenses: 230 },
  { date: "2024-06-01", receipts: 178, expenses: 200 },
  { date: "2024-06-02", receipts: 470, expenses: 410 },
  { date: "2024-06-03", receipts: 103, expenses: 160 },
  { date: "2024-06-04", receipts: 439, expenses: 380 },
  { date: "2024-06-05", receipts: 88, expenses: 140 },
  { date: "2024-06-06", receipts: 294, expenses: 250 },
  { date: "2024-06-07", receipts: 323, expenses: 370 },
  { date: "2024-06-08", receipts: 385, expenses: 320 },
  { date: "2024-06-09", receipts: 438, expenses: 480 },
  { date: "2024-06-10", receipts: 155, expenses: 200 },
  { date: "2024-06-11", receipts: 92, expenses: 150 },
  { date: "2024-06-12", receipts: 492, expenses: 420 },
  { date: "2024-06-13", receipts: 81, expenses: 130 },
  { date: "2024-06-14", receipts: 426, expenses: 380 },
  { date: "2024-06-15", receipts: 307, expenses: 350 },
  { date: "2024-06-16", receipts: 371, expenses: 310 },
  { date: "2024-06-17", receipts: 475, expenses: 520 },
  { date: "2024-06-18", receipts: 107, expenses: 170 },
  { date: "2024-06-19", receipts: 341, expenses: 290 },
  { date: "2024-06-20", receipts: 408, expenses: 450 },
  { date: "2024-06-21", receipts: 169, expenses: 210 },
  { date: "2024-06-22", receipts: 317, expenses: 270 },
  { date: "2024-06-23", receipts: 480, expenses: 530 },
  { date: "2024-06-24", receipts: 132, expenses: 180 },
  { date: "2024-06-25", receipts: 141, expenses: 190 },
  { date: "2024-06-26", receipts: 434, expenses: 380 },
  { date: "2024-06-27", receipts: 448, expenses: 490 },
  { date: "2024-06-28", receipts: 149, expenses: 200 },
  { date: "2024-06-29", receipts: 103, expenses: 160 },
  { date: "2024-06-30", receipts: 446, expenses: 400 },
];
const chartConfig = {
  views: {
    label: "Page Views",
  },
  receipts: {
    label: "Receipts",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ReceiptsAndExpensesPerMonth() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("receipts");

  const total = React.useMemo(
    () => ({
      receipts: chartData.reduce((acc, curr) => acc + curr.receipts, 0),
      expenses: chartData.reduce((acc, curr) => acc + curr.expenses, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Receipts and expenses per month</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex border-l border-r">
          {["receipts", "expenses"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center p-6">
          <DatePickerWithRange />
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
