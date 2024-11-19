"use client";

import { Button } from "../button";

type GraphButtonProps = {
  text: string;
  height: number;
  onChange?: () => object;
  onClick?: () => void;
  isClicked?: boolean;
};

export default function GraphButton({
  text,
  height,
  onChange,
  onClick,
  isClicked,
}: GraphButtonProps) {
  return (
    <Button
      onClick={onClick}
      onChange={onChange}
      style={{
        height: height,
      }}
      className={`${
        isClicked
          ? "bg-[#0B2545] text-[#EEF4ED] font-semibold hover:bg-[#0B2545] hover:text-[#EEF4ED] rounded-[12px] h-full w-full"
          : "bg-[#8DA9C4] text-[#0B2545] font-semibold hover:bg-[#97b2ca] hover:text-[#0B2545] rounded-[12px] h-full w-full"
      }`}
    >
      {text}
    </Button>
  );
}
