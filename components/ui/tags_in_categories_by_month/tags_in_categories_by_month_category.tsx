import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { numberToBRL } from "@/components/util/money.handler";
import { Icons } from "../icons";

type TagsInCategoriesByMonthCategoryProps = {
  color: string;
  name: string;
  amount: number;
  tags: React.ReactNode[];
};

export default function TagsInCategoriesByMonthCategory({
  color,
  name,
  amount,
  tags,
}: TagsInCategoriesByMonthCategoryProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Collapsible className="flex flex-col items-center justify-center w-full">
      <CollapsibleTrigger className="w-full" onClick={handleClick}>
        <div
          style={{ borderColor: color }}
          className={`border-[2px] bg-white font-semibold text-[20px] rounded-[12px] pl-2 p-2 flex items-center gap-4 justify-between w-full`}
        >
          <div className="flex items-center justify-between w-full">
            <div>{name}</div>
            <div>{numberToBRL(amount)}</div>
          </div>

          {isClicked ? (
            <Icons.chevronsDownUp
              style={{ backgroundColor: color }}
              className={`text-white rounded-[6px]`}
            />
          ) : (
            <Icons.chevronsUpDown
              style={{ backgroundColor: color }}
              className={`text-white rounded-[6px]`}
            />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-center justify-center gap-2 pl-4 w-full">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-xs font-medium w-full"
          >
            {tag}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
