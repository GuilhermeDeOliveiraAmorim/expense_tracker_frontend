"use client";

import AddCategoryForm from "@/components/forms/category/add_category_form";
import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import AddTagForm from "@/components/forms/tag/add_tag_form";
import DashboardHeader from "@/components/layout/common/header/dashboardheader";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("user_id");

    if (id === null || id === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    setUserId(id);
  }, [userId]);

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />

      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-64 p-4">
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="block text-lg hover:text-gray-300">
                  Menu 1
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="block text-lg hover:text-gray-300">
                  Menu 2
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="block text-lg hover:text-gray-300">
                  Menu 3
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex flex-col bg-gray-100 p-6 gap-6 w-full">
          <AddCategoryForm user_id={userId} />
          <AddTagForm user_id={userId} />
          <AddExpenseForm user_id={userId} />
        </main>
      </div>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
