"use client";

import { useState } from "react";
import GraphButton from "../buttons/graph_button";
import SelectV2 from "../selects/select_v2";
import AmountMonthByMonthInAYearChart, {
  ChartData,
} from "./amount_month_by_month_in_a_year_chart";

type AmountMonthByMonthInAYearProps = {
  years: Array<{ value: string; label: string }>;
  data: ChartData;
};

export default function AmountMonthByMonthInAYear({
  years,
  data,
}: AmountMonthByMonthInAYearProps) {
  const [activeButton, setActiveButton] = useState<"bt1" | "bt2" | null>("bt1");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md">
      <AmountMonthByMonthInAYearChart years={years} data={data} />
      <div className="flex flex-row gap-2 p-2 w-full">
        <GraphButton
          text="2024"
          height={50}
          onClick={() => {
            setActiveButton("bt1");
            setSelectedYear("2024");
          }}
          isClicked={activeButton === "bt1"}
        />
        <GraphButton
          text="2023"
          height={50}
          onClick={() => {
            setActiveButton("bt2");
            setSelectedYear("2023");
          }}
          isClicked={activeButton === "bt2"}
        />
        <SelectV2
          label="Year"
          placeholder="Select year"
          onChange={(value) => {
            console.log("Selected year:", value);
            setActiveButton(null);
            setSelectedYear(value);
          }}
          options={years}
        />
      </div>
      <div className="p-2 text-sm text-gray-600">
        Selected Year: {selectedYear ?? "None"}
      </div>
    </div>
  );
}
