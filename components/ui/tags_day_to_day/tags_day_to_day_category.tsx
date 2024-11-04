"use client";

import { numberToBRL } from "@/components/util/money.handler";
import TagsDayToDayTag from "./tags_day_to_day_tag";

type TagsDayToDayCategoryProps = {
  name: string;
  amount: number;
  color: string;
  tags: Array<{ name: string; amount: number; color: string }>;
};

export default function TagsDayToDayCategory({
  name,
  amount,
  color,
  tags,
}: TagsDayToDayCategoryProps) {
  return (
    <div
      style={{ borderColor: color, backgroundColor: color }}
      className="flex flex-col justify-between border-[2px] rounded-[4px] text-[20px] font-bold text-[#EEF4ED] w-full"
    >
      <div className="flex justify-between w-full">
        <div className="p-2">{name}</div>
        <div className="p-2">{numberToBRL(amount)}</div>
      </div>
      <div className="grid grid-cols-2 gap-1 p-[4px] bg-white rounded-[4px]">
        {tags.map((tag) => (
          <TagsDayToDayTag
            key={tag.name}
            name={tag.name}
            amount={tag.amount}
            color={tag.color}
          />
        ))}
      </div>
    </div>
  );
}
