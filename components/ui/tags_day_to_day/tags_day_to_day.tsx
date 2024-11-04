"use client";

import { numberToBRL } from "@/components/util/money.handler";
import { CategoriesData } from "../tags_in_categories_by_month/tags_in_categories_by_month";
import NextPrevButton from "../buttons/next_prev_button";
import SelectV2 from "../selects/select_v2";
import TagsDayToDayCategory from "./tags_day_to_day_category";

type TagsDayToDayProps = {
  day: string;
  nameOfDay: string;
  amount: number;
  months: {
    options: Array<{ value: string; label: string }>;
    label: string;
    placeholder: string;
    onChange: (value: string) => void;
  };
  years: {
    options: Array<{ value: string; label: string }>;
    label: string;
    placeholder: string;
    onChange: (value: string) => void;
  };
  categories: CategoriesData;
};

export default function TagsDayToDay({
  day,
  nameOfDay,
  amount,
  months,
  years,
  categories,
}: TagsDayToDayProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] shadow-md justify-between">
      <div className="flex justify-between items-center bg-[#8DA9C4] h-[50px] rounded-tl-[12px] rounded-tr-[12px]">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-[#13315C] text-[#EEF4ED] text-[24px] font-bold h-[50px] w-[50px] rounded-tl-[12px]">
            {day}
          </div>
          <div className="text-[#EEF4ED] text-[24px] font-bold">
            {nameOfDay}
          </div>
        </div>
        <div className="flex items-center rounded-tl-[8px] text-[#EEF4ED] text-[24px] font-bold rounded-bl-[8px] bg-[#134074] h-[42px] pl-2 pr-2  rounded-tr-[8px] mr-[4px]">
          {numberToBRL(amount)}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-[10px]">
        {categories.categories.map((category) => (
          <TagsDayToDayCategory
            key={category.name}
            name={category.name}
            amount={category.amount}
            color={category.color}
            tags={category.tags}
          />
        ))}
      </div>
      <div className="flex justify-between items-center gap-[10px] p-[10px] bg-[#8DA9C4] rounded-bl-[12px] rounded-br-[12px]">
        <NextPrevButton isNext={false} onClick={() => {}} />
        <SelectV2
          label={months.label}
          placeholder={months.placeholder}
          onChange={months.onChange}
          options={months.options}
        />
        <SelectV2
          label={years.label}
          placeholder={years.placeholder}
          onChange={years.onChange}
          options={years.options}
        />
        <NextPrevButton isNext={true} onClick={() => {}} />
      </div>
    </div>
  );
}
