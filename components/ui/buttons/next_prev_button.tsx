"use client";

import { Button } from "../button";
import { Icons } from "../icons";

type NextPrevButtonProps = {
  onClick: () => void;
  isNext: boolean;
};

export default function NextPrevButton({
  onClick,
  isNext,
}: NextPrevButtonProps) {
  return (
    <Button
      className="bg-[#0B2545] text-[#EEF4ED] font-semibold hover:bg-[#1b385f] hover:text-[#EEF4ED] rounded-[12px]"
      onClick={onClick}
    >
      {isNext ? <Icons.chevronRight /> : <Icons.chevronLeft />}
    </Button>
  );
}
