"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import GraphButton from "../buttons/graph_button";
import SelectV2 from "../selects/select_v2";
import AmountMonthByMonthInAYearChart, {
  ChartDataItem,
} from "./amount_month_by_month_in_a_year_chart";
import { useEffect, useState } from "react";
import { getTotalExpensesMonthCurrentYear } from "@/components/query_functions/qf.presenters";
import {
  GetTotalExpensesMonthCurrentYearInputDTO,
  GetTotalExpensesMonthCurrentYearOutputDTO,
  MonthCurrentYear,
} from "@/internal/presenters/get_total_expenses_month_current_year";
import { IconSpinner } from "../iconspinner";

type AmountMonthByMonthInAYearProps = {
  years: Array<{ value: string; label: string }>;
};

export default function AmountMonthByMonthInAYear({
  years,
}: AmountMonthByMonthInAYearProps) {
  const [activeButton, setActiveButton] = useState<"bt1" | "bt2" | null>("bt1");
  const [topYears, setTopYears] = useState<string[]>([]);
  const [filteredYears, setFilteredYears] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [resetKey, setResetKey] = useState(0);
  const [expensesMonthCurrentYear, setExpensesMonthCurrentYear] = useState<
    MonthCurrentYear[]
  >([]);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const convertToChartData = (
    expenses: MonthCurrentYear[]
  ): ChartDataItem[] => {
    return expenses.map((expense) => ({
      value: expense.month,
      amount: expense.total,
    }));
  };

  const {
    data: totalExpensesMonthCurrentYearData,
    error: totalExpensesMonthCurrentYearError,
    isLoading: totalExpensesMonthCurrentYearLoading,
  } = useQuery({
    queryKey: [
      "total-expenses-month-current-year",
      "total-expenses-month-current-year",
    ],
    queryFn: () => getTotalExpensesMonthCurrentYear({ year: 2024 }),
  });

  const mutation = useMutation<
    GetTotalExpensesMonthCurrentYearOutputDTO,
    Error,
    GetTotalExpensesMonthCurrentYearInputDTO
  >({
    mutationKey: ["getTotalExpensesMonthCurrentYear"],
    mutationFn: getTotalExpensesMonthCurrentYear,
    onSuccess: (output: GetTotalExpensesMonthCurrentYearOutputDTO) => {
      if (output && output.expenses_month_current_year.months) {
        const formattedData = convertToChartData(
          output.expenses_month_current_year.months
        );
        setExpensesMonthCurrentYear(output.expenses_month_current_year.months);
        setChartData(formattedData);
      } else {
        setExpensesMonthCurrentYear([]);
      }
    },
    onError: () => setExpensesMonthCurrentYear([]),
  });

  useEffect(() => {
    const sortedYears = years
      .map((year) => year.value)
      .sort((a, b) => parseInt(b) - parseInt(a));

    const topTwoYears = sortedYears.slice(0, 2);

    setTopYears(topTwoYears);

    const remainingYears = years.filter(
      (year) => !topTwoYears.includes(year.value)
    );

    setFilteredYears(remainingYears);
  }, [years]);

  useEffect(() => {
    if (!totalExpensesMonthCurrentYearLoading) {
      if (totalExpensesMonthCurrentYearData?.expenses_month_current_year) {
        const formattedData = convertToChartData(
          totalExpensesMonthCurrentYearData.expenses_month_current_year.months
        );
        setExpensesMonthCurrentYear(
          totalExpensesMonthCurrentYearData.expenses_month_current_year.months
        );
        setChartData(formattedData);
      }
    }
  }, [
    totalExpensesMonthCurrentYearData?.expenses_month_current_year,
    totalExpensesMonthCurrentYearLoading,
  ]);

  const handleYearSelection = (year: string) => {
    mutation.mutate({ year: parseInt(year, 10) });
  };

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md pt-4 justify-between">
      {totalExpensesMonthCurrentYearError ? (
        <div className="flex justify-center items-center h-full w-full">
          Error loading data
        </div>
      ) : totalExpensesMonthCurrentYearLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <IconSpinner />
        </div>
      ) : expensesMonthCurrentYear.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full">
          No expenses found
        </div>
      ) : (
        <AmountMonthByMonthInAYearChart years={years} data={chartData} />
      )}

      <div className="flex flex-row gap-2 p-2 w-full">
        {years.length === 1 && (
          <GraphButton
            text={years[0].value}
            height={50}
            onClick={() => {
              handleYearSelection(years[0].value);
              setActiveButton("bt1");
            }}
            isClicked={activeButton === "bt1"}
          />
        )}

        {years.length === 2 && (
          <>
            <GraphButton
              text={topYears[0]}
              height={50}
              onClick={() => {
                handleYearSelection(topYears[0]);
                setActiveButton("bt1");
              }}
              isClicked={activeButton === "bt1"}
            />
            <GraphButton
              text={topYears[1]}
              height={50}
              onClick={() => {
                handleYearSelection(topYears[1]);
                setActiveButton("bt2");
              }}
              isClicked={activeButton === "bt2"}
            />
          </>
        )}

        {years.length > 2 && (
          <>
            <GraphButton
              text={topYears[0]}
              height={50}
              onClick={() => {
                handleYearSelection(topYears[0]);
                setActiveButton("bt1");
                setResetKey((prev) => prev + 1);
              }}
              isClicked={activeButton === "bt1"}
            />
            <GraphButton
              text={topYears[1]}
              height={50}
              onClick={() => {
                handleYearSelection(topYears[1]);
                setActiveButton("bt2");
                setResetKey((prev) => prev + 1);
              }}
              isClicked={activeButton === "bt2"}
            />
            <SelectV2
              key={resetKey}
              label="Year"
              placeholder="Select year"
              onChange={(value) => {
                console.log("Selected year:", value);
                setActiveButton(null);
                handleYearSelection(value);
              }}
              options={filteredYears}
            />
          </>
        )}
      </div>
    </div>
  );
}
