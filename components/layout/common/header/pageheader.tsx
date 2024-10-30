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
    sessionStorage.setItem("access_token", "");
    localStorage.clear();
    sessionStorage.clear();

    router.push("/login");
  };

  return (
    <header className="bg-white h-fit">
      <div className="flex flex-col md:flex-row md:justify-between items-center p-2 gap-2">
        <div className="flex items-center gap-2">
          <Link href={"/"} className="flex items-center gap-2">
            <Logo height="40" width="40" />
            <span className="text-xl font-bold text-gray-700">
              Expense Insight
            </span>
          </Link>
        </div>

        <div className="flex flex-row gap-2">
          {menu ? menu : ""}
          <Link href={"/login"}>
            <Button onClick={logout} variant="destructive">
              <Icons.power className="w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
