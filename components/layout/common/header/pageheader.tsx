"use client";

import Logo from "@/components/logo/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

type DashboardHeaderProps = {
  menu?: JSX.Element;
};

export default function PageHeader({ menu }: DashboardHeaderProps) {
  const router = useRouter();

  const logout = () => {
    sessionStorage.setItem("user_id", "");
    sessionStorage.setItem("access_token", "");

    router.push("/login");
  };

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
          {menu ? menu : ""}
          <Link href={"/login"}>
            <Button onClick={logout} variant="destructive">
              <Icons.power className="w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
