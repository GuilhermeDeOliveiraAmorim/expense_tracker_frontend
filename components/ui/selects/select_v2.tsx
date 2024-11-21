"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

type SelectV2Props = {
  options: Array<{ value: string; label: string }>;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
};

export default function SelectV2({
  options,
  label,
  onChange,
  placeholder,
  defaultValue,
}: SelectV2Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Select onValueChange={handleChange} value={selectedValue}>
      <SelectTrigger className="bg-white rounded-[12px] text-[14px] text-[#0B2545] font-semibold h-[50px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="bg-white">
          <SelectLabel className="text-[14px] text-[#0B2545] font-semibold py-[12px] px-[16px]">
            {label}
          </SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-[14px] text-[#0B2545] font-normal hover:bg-gray-100"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
