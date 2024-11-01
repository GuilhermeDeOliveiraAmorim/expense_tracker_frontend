import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker | Configurations",
  description: "View your expense insights",
};

export default function NewComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
