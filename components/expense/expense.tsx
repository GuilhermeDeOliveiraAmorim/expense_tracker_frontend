"use client";

import AddCategoryForm from "@/components/forms/category/add_category_form";
import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import AddTagForm from "@/components/forms/tag/add_tag_form";
import DashboardHeader from "@/components/layout/common/header/pageheader";
import Head from "next/head";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageMenu } from "../layout/common/menu/pagemenu";

export default function Expense() {
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
    <div>
      <Head>
        <title>Expense Insight | Dashboard</title>
        <meta name="description" content="Learn more about us on this page." />
      </Head>
      <div className="flex flex-col h-screen">
        <DashboardHeader menu={<PageMenu />} />

        <div className="flex flex-1">
          <main className="flex bg-gray-100 p-6 gap-6 w-full">
            <AddCategoryForm user_id={userId} />
            <AddTagForm user_id={userId} />
            <AddExpenseForm user_id={userId} />
          </main>
        </div>

        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>
            &copy;
            {new Date().getFullYear()}
            Meu Site. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
