import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

export function PageMenu() {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <Link href={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
      <Link href={"/expenses"}>
        <Button>Expenses</Button>
      </Link>
      <Link href={"/configurations"}>
        <Button>
          <Icons.slidersHorizontal className="w-4" />
        </Button>
      </Link>
    </div>
  );
}
