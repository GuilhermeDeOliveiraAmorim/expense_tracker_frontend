import DashboardContent from "@/components/dashboard/dashboardcontent";
import PageHeader from "@/components/layout/common/header/pageheader";
import Footer from "@/components/layout/footer/footer";
import { PageMenu } from "@/components/layout/common/menu/pagemenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Dashboard",
  description: "View your expense insights",
};

export default function DashboardContainer() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardContent
        header={<PageHeader menu={<PageMenu />} />}
        footer={<Footer />}
      />
    </div>
  );
}
