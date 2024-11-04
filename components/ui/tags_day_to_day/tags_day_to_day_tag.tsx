"use client";

import { numberToBRL } from "@/components/util/money.handler";

type TagsDayToDayTagProps = {
  name: string;
  amount: number;
  color: string;
};

export default function TagsDayToDayTag({
  name,
  amount,
  color,
}: TagsDayToDayTagProps) {
  return (
    <div
      style={{ borderColor: color }}
      className="flex justify-between border-[2px] rounded-[4px] text-xs font-bold text-[#0F172A] bg-white"
    >
      <div style={{ backgroundColor: color }} className="w-[15px]"></div>
      <div className="flex justify-between w-full">
        <div className="p-2">{name}</div>
        <div className="p-2">{numberToBRL(amount)}</div>
      </div>
    </div>
  );
}
