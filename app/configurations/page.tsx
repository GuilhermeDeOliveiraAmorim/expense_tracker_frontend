import ConfigurationsContent from "@/components/configurations/configurationscontent";
import PageHeader from "@/components/layout/common/header/pageheader";
import Footer from "@/components/layout/footer/footer";
import { PageMenu } from "@/components/layout/common/menu/pagemenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Configurations",
  description: "View your expense insights",
};

export default function ConfigurationsContainer() {
  return (
    <div className="flex flex-col h-screen">
      <ConfigurationsContent
        header={<PageHeader menu={<PageMenu />} />}
        footer={<Footer />}
      />
    </div>
  );
}
