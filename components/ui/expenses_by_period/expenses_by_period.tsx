import { useState } from "react";
import GraphButton from "../buttons/graph_button";
import { ExpensesByPeriodChart } from "./expenses_by_period_chart";

export function ExpensesByPeriod() {
  const [activeButton, setActiveButton] = useState<"bt1" | "bt2" | "bt3">(
    "bt1"
  );

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md pt-4">
      <ExpensesByPeriodChart />
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
