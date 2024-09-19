import Dashboard from "@/components/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Configurations",
  description: "View your expense insights",
};

export default function ConfigContainer() {
  return <Dashboard />;
}
