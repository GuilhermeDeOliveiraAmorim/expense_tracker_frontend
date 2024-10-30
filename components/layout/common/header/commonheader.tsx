import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommomHeader() {
  return (
    <header className="bg-white container mx-auto flex justify-between items-center py-4 px-6">
      <div className="flex items-center space-x-3">
        <Link href={"/"} className="flex items-center gap-1">
          <Logo height="40" width="40" />
          <span className="text-xl font-bold text-gray-700">
            Expense Tracker
          </span>
        </Link>
      </div>

      <div className="flex space-x-4">
        <Link href={"/signup"}>
          <Button>Cadastrar</Button>
        </Link>
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  );
}
