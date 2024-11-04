"use client";

import { useState } from "react";
import { Button } from "../button";

type GraphButtonProps = {
  text: string;
};

export default function GraphButton({ text }: GraphButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Button
      onClick={handleClick}
      className={`${
        isClicked
          ? "bg-[#0B2545] text-[#EEF4ED] font-semibold hover:bg-[#0B2545] hover:text-[#EEF4ED] rounded-[12px] h-full"
          : "bg-[#8DA9C4] text-[#0B2545] font-semibold hover:bg-[#97b2ca] hover:text-[#0B2545] rounded-[12px] h-full"
      }`}
    >
      {text}
    </Button>
  );
}
