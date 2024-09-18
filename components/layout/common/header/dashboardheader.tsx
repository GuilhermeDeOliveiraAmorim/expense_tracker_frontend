import Logo from "@/components/logo/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardMenu } from "../../menu/dashboard/dashboardmenu";

export default function DashboardHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <Link href={"/"} className="flex items-center gap-1">
            <Logo height="40" width="40" />
            <span className="text-xl font-bold text-gray-700">
              Expense Insight
            </span>
          </Link>
        </div>

        <div className="flex space-x-4">
          <DashboardMenu />
          <Link href={"/login"}>
            <Button>Logout</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
