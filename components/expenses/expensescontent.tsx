"use client";

import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/auth";

export default function ExpensesContent({ header, footer }: PageContentProps) {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const access_token = sessionStorage.getItem("access_token");

    if (
      access_token === null ||
      access_token === undefined ||
      user_id === null ||
      user_id === undefined ||
      access_token === "" ||
      access_token === "" ||
      user_id === "" ||
      user_id === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 2500,
      });

      router.push("/login");

      return;
    }

    setUserId(user_id);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {header ? header : ""}

      <main className="flex flex-1 bg-gray-100 pl-48 pr-48 pt-6 pb-6 gap-6 w-full">
        <AddExpenseForm user_id={userId} />
      </main>

      {footer ? footer : ""}
    </>
  );
}
