"use client";

import SelectV2 from "../selects/select_v2";
import TagsInCategoriesByMonthCategory from "./tags_in_categories_by_month_category";
import TagsInCategoriesByMonthTag from "./tags_in_categories_by_month_tag";
import { getCategoryTagsTotalsByMonthYear } from "@/components/query_functions/qf.presenters";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CategoryTagsTotals } from "@/internal/presenters/get_category_tags_totals_by_month_year";
import { IconSpinner } from "../iconspinner";
import {
  formatDateParameter,
  getMonthNumber,
  rangerDate,
} from "@/components/util/date.handler";
import { numberToBRL } from "@/components/util/money.handler";

type Tag = {
  amount: number;
  name: string;
  color: string;
};

type Category = {
  amount: number;
  color: string;
  name: string;
  tags: Tag[];
};

export type CategoriesData = {
  categories: Category[];
};

type TagsInCategoriesByMonthProps = {
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
};

export default function TagsInCategoriesByMonth({
  months,
  years,
}: TagsInCategoriesByMonthProps) {
  const [categoryTagsTotalsByMonthYear, setCategoryTagsTotalsByMonthYear] =
    useState<CategoryTagsTotals>();
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())
  );
  const [startDate, setStartDate] = useState(
    rangerDate({
      firstDayOfMonth: true,
    })
  );
  const [endDate, setEndDate] = useState(
    rangerDate({
      today: true,
    })
  );
  const [monthDisplayed, setMonthDisplayed] = useState<string>("");
  const [amountDisplayed, setAmountDisplayed] = useState<number>(0);
  const [yearDisplayed, setYearDisplayed] = useState<number>(0);

  const {
    data: categoryTagsTotalsByMonthYearData,
    error: categoryTagsTotalsByMonthYearError,
    isLoading: categoryTagsTotalsByMonthYearLoading,
  } = useQuery({
    queryKey: [
      "getCategoryTagsTotalsByMonthYear",
      "getCategoryTagsTotalsByMonthYear",
    ],
    queryFn: () =>
      getCategoryTagsTotalsByMonthYear({
        month: getMonthNumber(selectedMonth),
        year: new Date().getFullYear(),
      }),
  });

  const mutation = useMutation({
    mutationKey: ["getCategoryTagsTotalsByMonthYear"],
    mutationFn: getCategoryTagsTotalsByMonthYear,
    onSuccess: (output) => {
      if (output && output.expenses) {
        setCategoryTagsTotalsByMonthYear(output.expenses);
        setMonthDisplayed(output.expenses.month);
        setAmountDisplayed(output.expenses.expenses_amount);
        setYearDisplayed(output.expenses.year);
      } else {
        console.warn("No expenses data received");
      }
    },
    onError: (error) => {
      console.error("Failed to fetch category tags:", error.message);
    },
  });

  useEffect(() => {
    if (
      categoryTagsTotalsByMonthYearData &&
      categoryTagsTotalsByMonthYearData.expenses
    ) {
      setCategoryTagsTotalsByMonthYear(
        categoryTagsTotalsByMonthYearData.expenses
      );
      setMonthDisplayed(categoryTagsTotalsByMonthYearData.expenses.month);
      setAmountDisplayed(
        categoryTagsTotalsByMonthYearData.expenses.expenses_amount
      );
      setYearDisplayed(categoryTagsTotalsByMonthYearData.expenses.year);
    } else {
      console.log("error");
    }
  }, [categoryTagsTotalsByMonthYearData]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const start = new Date(`${selectedYear}-${selectedMonth}-01`);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

      const formattedStartDate = formatDateParameter(start);
      const formattedEndDate = formatDateParameter(end);

      if (formattedStartDate !== startDate || formattedEndDate !== endDate) {
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      mutation.mutate({
        month: getMonthNumber(selectedMonth),
        year: Number(selectedYear),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md justify-between">
      <div>
        <div className="flex justify-between items-center bg-[#8DA9C4] h-[50px] rounded-tl-[12px] rounded-tr-[12px] mb-2">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-[#13315C] text-[#EEF4ED] text-[24px] font-bold h-[50px] pl-2 pr-2 rounded-tl-[12px]">
              {yearDisplayed}
            </div>
            <div className="text-[#EEF4ED] text-[24px] font-bold">
              {monthDisplayed}
            </div>
          </div>
          <div className="flex items-center rounded-tl-[8px] text-[#EEF4ED] text-[24px] font-bold rounded-bl-[8px] bg-[#134074] h-[42px] pl-2 pr-2  rounded-tr-[8px] mr-[4px]">
            {numberToBRL(amountDisplayed)}
          </div>
        </div>

        {categoryTagsTotalsByMonthYearError ? (
          <div className="flex justify-center items-center h-full w-full">
            Error loading data
          </div>
        ) : categoryTagsTotalsByMonthYearLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <IconSpinner />
          </div>
        ) : !categoryTagsTotalsByMonthYear ||
          !categoryTagsTotalsByMonthYear.categories ||
          categoryTagsTotalsByMonthYear.categories.length === 0 ? (
          <div className="flex justify-center items-center h-full w-full">
            No expenses found
          </div>
        ) : (
          <div className="flex-col pl-2 pr-2 gap-2">
            {categoryTagsTotalsByMonthYear?.categories.map((category) => (
              <TagsInCategoriesByMonthCategory
                amount={category.category_amount}
                color={category.color}
                name={category.name}
                tags={category.tags.map((tag) => (
                  <TagsInCategoriesByMonthTag
                    amount={tag.tag_amount}
                    name={tag.name}
                    key={tag.name}
                    color={tag.color}
                  />
                ))}
                key={category.name}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2 p-2 w-full">
        <SelectV2
          label="Month"
          placeholder="Select month"
          onChange={(value) => setSelectedMonth(value)}
          options={months}
          value={selectedMonth ?? undefined}
        />

        <SelectV2
          label="Year"
          placeholder="Select year"
          onChange={(value) => setSelectedYear(value)}
          options={years}
          value={selectedYear ?? undefined}
        />
      </div>
    </div>
  );
}
