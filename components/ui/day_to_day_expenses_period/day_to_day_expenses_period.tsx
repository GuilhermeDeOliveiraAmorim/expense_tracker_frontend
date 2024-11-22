import GraphButton from "../buttons/graph_button";
import { useEffect, useState } from "react";
import { DayToDayExpensesPeriodChart } from "./day_to_day_expenses_period_chart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDayToDayExpensesPeriod } from "@/components/query_functions/qf.presenters";
import { rangerDate } from "@/components/util/date.handler";
import {
  DayToDayExpense,
  GetDayToDayExpensesPeriodInputDTO,
  GetDayToDayExpensesPeriodOutputDTO,
} from "@/internal/presenters/get_day_to_day_expenses_period";
import { format } from "date-fns";
import { ChartDataItem } from "../amount_month_by_month_in_a_year/amount_month_by_month_in_a_year_chart";
import { IconSpinner } from "../iconspinner";

export function DayToDayExpensesPeriod() {
  const [activeButton, setActiveButton] = useState<"bt1" | "bt2" | "bt3">(
    "bt1"
  );
  const [dayToDayExpenses, setDayToDayExpenses] = useState<DayToDayExpense[]>(
    []
  );
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const calculateStartDate = (weeks: number): string => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - weeks * 7);
    return format(startDate, "ddMMyyyy");
  };

  const convertToChartData = (expenses: DayToDayExpense[]): ChartDataItem[] => {
    return expenses.map((expense) => ({
      value: expense.day + " / " + expense.month.slice(0, 3),
      amount: expense.amount,
    }));
  };

  const {
    data: expensesData,
    error: expensesError,
    isLoading: expensesLoading,
  } = useQuery({
    queryKey: ["getDayToDayExpensesPeriod", "getDayToDayExpensesPeriod"],
    queryFn: () =>
      getDayToDayExpensesPeriod({
        startDate: calculateStartDate(1),
        endDate: rangerDate({ today: true }),
      }),
  });

  const mutation = useMutation<
    GetDayToDayExpensesPeriodOutputDTO,
    Error,
    GetDayToDayExpensesPeriodInputDTO
  >({
    mutationKey: ["getDayToDayExpensesPeriod"],
    mutationFn: getDayToDayExpensesPeriod,
    onSuccess: (output: GetDayToDayExpensesPeriodOutputDTO) => {
      if (output && output.expenses) {
        const formattedData = convertToChartData(output.expenses);
        setDayToDayExpenses(output.expenses);
        setChartData(formattedData);
      } else {
        setDayToDayExpenses([]);
      }
    },
    onError: () => setDayToDayExpenses([]),
  });

  useEffect(() => {
    if (!expensesLoading) {
      if (expensesData?.expenses) {
        const formattedData = convertToChartData(expensesData.expenses);
        setDayToDayExpenses(expensesData.expenses);
        setChartData(formattedData);
      }
    }
  }, [expensesData?.expenses, expensesLoading]);

  const handleButtonClick = (button: "bt1" | "bt2" | "bt3", weeks: number) => {
    setActiveButton(button);
    const startDate = calculateStartDate(weeks);
    const endDate = rangerDate({
      today: true,
    });

    mutation.mutate({
      startDate,
      endDate,
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md pt-4 justify-between">
      {expensesError ? (
        <div className="flex justify-center items-center h-full w-full">
          Error loading data
        </div>
      ) : expensesLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <IconSpinner />
        </div>
      ) : dayToDayExpenses.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full">
          No expenses found
        </div>
      ) : (
        <DayToDayExpensesPeriodChart data={chartData} />
      )}

      <div className="flex flex-row gap-2 p-2 w-full">
        <GraphButton
          text="1W"
          height={50}
          onClick={() => handleButtonClick("bt1", 1)}
          isClicked={activeButton === "bt1"}
        />
        <GraphButton
          text="2W"
          height={50}
          onClick={() => handleButtonClick("bt2", 2)}
          isClicked={activeButton === "bt2"}
        />
        <GraphButton
          text="3W"
          height={50}
          onClick={() => handleButtonClick("bt3", 3)}
          isClicked={activeButton === "bt3"}
        />
      </div>
    </div>
  );
}
