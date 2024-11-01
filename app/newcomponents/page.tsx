import { Metadata } from "next";
import { CurrentMonthAmount } from "@/components/ui/current_month_amount/current_month_amount";

export const metadata: Metadata = {
  title: "Expense Tracker | Configurations",
  description: "View your expense insights",
};

export default function NewComponents() {
  return <CurrentMonthAmount />;
}
