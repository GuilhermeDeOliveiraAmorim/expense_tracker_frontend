import { getTotalExpensesForCurrentMonth } from "@/components/query_functions/qf.presenters";
import { numberToBRL } from "@/components/util/money.handler";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IconSpinner } from "../iconspinner";

export function CurrentMonthAmount() {
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("");

  const {
    data: totalExpensesForCurrentMonthData,
    error: totalExpensesForCurrentMonthError,
    isLoading: totalExpensesForCurrentMonthLoading,
  } = useQuery({
    queryKey: ["getExpensesByCategoryPeriod", "getExpensesByCategoryPeriod"],
    queryFn: () => getTotalExpensesForCurrentMonth({}),
  });

  useEffect(() => {
    if (!totalExpensesForCurrentMonthLoading) {
      if (totalExpensesForCurrentMonthData) {
        setAmount(totalExpensesForCurrentMonthData.total_expenses);
        setMonth(totalExpensesForCurrentMonthData.current_month);
      }
    }
  }, [totalExpensesForCurrentMonthData, totalExpensesForCurrentMonthLoading]);

  console.log(totalExpensesForCurrentMonthData);

  return (
    <div className="relative">
      <div className="absolute -top-2 right-4 bg-[#134074] text-[30px] text-[#EEF4ED] rounded-[12px] px-8 py-3 h-[70px] shadow-md">
        {totalExpensesForCurrentMonthError ? (
          <div className="flex justify-center items-center h-full w-full">
            Error
          </div>
        ) : totalExpensesForCurrentMonthLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <IconSpinner />
          </div>
        ) : !totalExpensesForCurrentMonthData ? (
          <div className="flex justify-center items-center h-full w-full">
            Not found
          </div>
        ) : (
          numberToBRL(amount)
        )}
      </div>
      <div className=" bg-[#EEF4ED] rounded-[12px] pl-3 pt-3 pb-3 shadow-md">
        <span className="text-[20px] font-bold text-center text-[#0B2545]">
          {totalExpensesForCurrentMonthError ? (
            <div className="flex justify-center items-center h-full w-full">
              Error
            </div>
          ) : totalExpensesForCurrentMonthLoading ? (
            <div className="flex justify-center items-center h-full w-full">
              <IconSpinner />
            </div>
          ) : !totalExpensesForCurrentMonthData ? (
            <div className="flex justify-center items-center h-full w-full">
              Not found
            </div>
          ) : (
            month
          )}
        </span>
      </div>
    </div>
  );
}
