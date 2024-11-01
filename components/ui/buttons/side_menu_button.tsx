import React, { useState } from "react";
import { Button } from "../button";

type SideMenuButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

export default function SideMenuButton({
  icon,
  label,
  onClick,
}: SideMenuButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className="flex flex-row items-center w-full p-2 gap-2 bg-[#134074] rounded-[12px]"
      onClick={onClick}
    >
      <div className="text-[#8DA9C4]">{icon}</div>
      <Button
        className={`${
          isClicked
            ? "w-full bg-[#8DA9C4] text-[#0B2545] font-semibold hover:bg-[#97b2ca] hover:text-[#0B2545] rounded-[12px]"
            : "w-full bg-[#0B2545] text-[#EEF4ED] font-semibold hover:bg-[#13315C] hover:text-[#EEF4ED] rounded-[12px]"
        }`}
        onClick={handleClick}
      >
        {label}
      </Button>
    </div>
  );
}
