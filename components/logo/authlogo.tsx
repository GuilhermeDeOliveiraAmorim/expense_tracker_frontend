"use client";

import { useRouter } from "next/navigation";
import Logo from "./logo";

export default function AuthLogo() {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-row items-center justify-center h-full w-full pb-4">
      <div
        onClick={goToHomePage}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <Logo height="150" width="150" />
        <h1 className="text-white text-3xl">Expense Tracker</h1>
      </div>
    </div>
  );
}
