import { Metadata } from "next";
import { CurrentMonthAmount } from "@/components/ui/current_month_amount/current_month_amount";

export const metadata: Metadata = {
  title: "Expense Tracker | Configurations",
  description: "View your expense insights",
};

export default function NewComponents() {
  return (
    <main className="grid grid-cols-4 gap-4 pl-36 pr-36 pt-12">
      <CurrentMonthAmount />
    </main>
  );
}
