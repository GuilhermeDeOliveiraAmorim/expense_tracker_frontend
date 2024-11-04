"use client";

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
};

export default function SelectV2({
  options,
  label,
  onChange,
  placeholder,
}: SelectV2Props) {
  return (
    <Select>
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
              onClick={() => onChange(option.value)}
              className="text-[14px] text-[#0B2545] font-normal hover:bg-gray-100"
            >
              {option.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
