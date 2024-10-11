"use client";

import GetTotalExpensesForPeriodForm from "../forms/presenters/get_total_expenses_for_period_form";
import GetExpensesByCategoryPeriodForm from "../forms/presenters/get_expenses_by_category_period_form";
import GetExpensesByMonthYearForm from "../forms/presenters/get_expenses_by_month_year_form";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/props.types";
import { GetTotalExpensesMonthCurrentYearForm } from "../forms/presenters/get_total_expenses_month_current_year_form";

export default function DashboardContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="flex flex-col h-screen">
      {header ? header : ""}

      <main className="flex flex-col bg-gray-100 pl-48 pr-48 pt-6 pb-6 gap-6 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 w-4/12">
            <GetTotalExpensesForPeriodForm />
            <GetTotalExpensesMonthCurrentYearForm />
            <GetExpensesByCategoryPeriodForm />
          </div>
          <div className="w-8/12 h-full">
            <GetExpensesByMonthYearForm />
          </div>
        </div>
      </main>

      {footer ? footer : ""}
    </div>
  );
}
