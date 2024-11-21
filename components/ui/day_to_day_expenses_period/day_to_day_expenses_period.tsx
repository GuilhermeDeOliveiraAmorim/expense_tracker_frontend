import { useState } from "react";
import GraphButton from "../buttons/graph_button";
import { DayToDayExpensesPeriodChart } from "./day_to_day_expenses_period_chart";
import { ChartData } from "../amount_month_by_month_in_a_year/amount_month_by_month_in_a_year_chart";

type DayToDayExpensesPeriodProps = {
  data: ChartData;
};

export function DayToDayExpensesPeriod({ data }: DayToDayExpensesPeriodProps) {
  const [activeButton, setActiveButton] = useState<"bt1" | "bt2" | "bt3">(
    "bt1"
  );

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md pt-4">
      <DayToDayExpensesPeriodChart data={data} />
      <div className="flex flex-row gap-2 p-2 w-full">
        <GraphButton
          text="1W"
          height={30}
          onClick={() => {
            setActiveButton("bt1");
          }}
          isClicked={activeButton === "bt1"}
        />
        <GraphButton
          text="2W"
          height={30}
          onClick={() => {
            setActiveButton("bt2");
          }}
          isClicked={activeButton === "bt2"}
        />
        <GraphButton
          text="3W"
          height={30}
          onClick={() => {
            setActiveButton("bt3");
          }}
          isClicked={activeButton === "bt3"}
        />
      </div>
    </div>
  );
}
