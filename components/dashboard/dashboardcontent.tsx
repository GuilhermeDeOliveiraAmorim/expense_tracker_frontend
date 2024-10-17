"use client";

import GetExpensesByMonthYearForm from "../forms/presenters/get_expenses_by_month_year_form";
import GetCategoryTagsTotalsByMonthYearForm from "../forms/presenters/get_category_tags_totals_by_month_year_form";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/props.types";
import { GetTotalExpensesMonthCurrentYearForm } from "../forms/presenters/get_total_expenses_month_current_year_form";
import { MonthOption } from "@/internal/presenters/get_available_months_years";
import { useQuery } from "@tanstack/react-query";
import { getAvailableMonthsYears } from "../query_functions/qf.presenters";
import { MainContent } from "../ui/maincontent";
import { Content } from "../ui/content";

export default function DashboardContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [avaliableMonths, setAvaliableMonths] = useState<MonthOption[]>([]);
  const [avaliableYears, setAvaliableYears] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: monthsYearsAvailableData,
    error: monthsYearsAvailableError,
    isLoading: monthsYearsAvailableLoading,
  } = useQuery({
    queryKey: ["months-years-available", "months-years-available"],
    queryFn: () => getAvailableMonthsYears({}),
  });

  useEffect(() => {
    if (monthsYearsAvailableData) {
      setAvaliableMonths(monthsYearsAvailableData.available_months);
      setAvaliableYears(monthsYearsAvailableData.available_years);
    }
  }, [monthsYearsAvailableData, monthsYearsAvailableLoading]);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    if (
      access_token === null ||
      access_token === undefined ||
      access_token === "" ||
      access_token === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 2500,
      });

      router.push("/login");

      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (monthsYearsAvailableError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch years and months available",
      duration: 2500,
    });
    return;
  }

  return (
    <Content>
      {header ? header : ""}

      <MainContent>
        <div className="flex flex-col lg:flex-row gap-2">
          <GetTotalExpensesMonthCurrentYearForm
            availableYears={avaliableYears}
          />
          <GetCategoryTagsTotalsByMonthYearForm
            availableMonths={avaliableMonths}
            availableYears={avaliableYears}
          />
        </div>
        <div>
          <GetExpensesByMonthYearForm
            availableMonths={avaliableMonths}
            availableYears={avaliableYears}
          />
        </div>
      </MainContent>

      {footer ? footer : ""}
    </Content>
  );
}
