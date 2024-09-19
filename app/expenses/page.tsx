import ExpensesContent from "@/components/expenses/expensescontent";
import PageHeader from "@/components/layout/common/header/pageheader";
import Footer from "@/components/layout/footer/footer";
import { PageMenu } from "@/components/layout/common/menu/pagemenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Expense",
  description: "View your expense insights",
};

export default function ExpenseContainer() {
  return (
    <div className="flex flex-col h-screen">
      <ExpensesContent
        header={<PageHeader menu={<PageMenu />} />}
        footer={<Footer />}
      />
    </div>
  );
}
