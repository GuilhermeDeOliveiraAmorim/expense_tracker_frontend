import AddExpenseForm from "@/components/forms/expense/add_expense_form";
import DashboardHeader from "@/components/layout/common/header/dashboardheader";

export default function Expenses() {
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
          <AddExpenseForm user_id="" />
        </main>
      </div>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
