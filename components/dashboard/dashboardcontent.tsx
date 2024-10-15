"use client";

import GetExpensesByMonthYearForm from "../forms/presenters/get_expenses_by_month_year_form";
import GetCategoryTagsTotalsByMonthYearForm from "../forms/presenters/get_category_tags_totals_by_month_year_form";
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
    <div className="flex flex-col justify-between h-full">
      {header ? header : ""}

      <main className="flex flex-col bg-gray-100 pl-48 pr-48 pt-4 pb-4 gap-4 w-full h-full">
        <div className="flex flex-row gap-4 w-12/12">
          <GetTotalExpensesMonthCurrentYearForm />
          <GetCategoryTagsTotalsByMonthYearForm />
        </div>
        <div className="w-12/12">
          <GetExpensesByMonthYearForm />
        </div>
      </main>

      {footer ? footer : ""}
    </div>
  );
}
