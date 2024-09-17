import Dashboard from "@/components/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Dashboard",
  description: "View your expense insights",
};

export default function Home() {
  return <Dashboard />;
}
