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
  year?: {
    selectedYear: number;
    years: number[];
    onYearChange: (value: number) => void;
  };
  month?: {
    selectedMonth: string;
    months: { value: string; label: string }[];
    onMonthChange: (value: string) => void;
  };
  onRefresh: () => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  year,
  month,
  onRefresh,
}) => {
  return (
    <div className="flex flex-row gap-4 justify-between">
      {month && (
        <Select
          name="month"
          key={month.selectedMonth}
          onValueChange={(value) => month.onMonthChange(value)}
          value={month.selectedMonth}
          aria-label="Months listing"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {month.months?.length > 0 ? (
                month.months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="no-available" disabled value="no-available">
                  No months available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {year && (
        <Select
          name="year"
          key={year.selectedYear}
          onValueChange={(value) => year.onYearChange(Number(value))}
          value={year.selectedYear.toString()}
          aria-label="Years listing"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {year.years?.length > 0 ? (
                year.years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="no-available" disabled value="no-available">
                  No years available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <Button type="button" variant="outline" onClick={onRefresh}>
        <Icons.refreshCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DateSelector;
