import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

type DateSelectorProps = {
  selectedMonth: string;
  selectedYear: number;
  months: { value: string; label: string }[];
  onMonthChange: (value: string) => void;
  onYearChange: (value: number) => void;
  onRefresh: () => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedMonth,
  selectedYear,
  months,
  onMonthChange,
  onYearChange,
  onRefresh,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <Select
        name="month"
        key={selectedMonth}
        onValueChange={(value) => onMonthChange(value)}
        value={selectedMonth}
        aria-label="Months listing"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        name="year"
        key={selectedYear}
        onValueChange={(value) => onYearChange(Number(value))}
        value={selectedYear.toString()}
        aria-label="Years listing"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="button" variant="outline" onClick={onRefresh}>
        <Icons.refreshCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DateSelector;
