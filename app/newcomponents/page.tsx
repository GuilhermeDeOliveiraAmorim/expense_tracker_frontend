"use client";

import { CurrentMonthAmount } from "@/components/ui/current_month_amount/current_month_amount";
import { Icons } from "@/components/ui/icons";
import GraphButton from "@/components/ui/buttons/graph_button";
import NextPrevButton from "@/components/ui/buttons/next_prev_button";
import SideMenuButton from "@/components/ui/buttons/side_menu_button";
import TagsInCategoriesByMonth, {
  CategoriesData,
} from "@/components/ui/tags_in_categories_by_month/tags_in_categories_by_month";
import TagsDayToDay from "@/components/ui/tags_day_to_day/tags_day_to_day";

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const years = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

const categoriesData: CategoriesData = {
  categories: [
    {
      amount: 1234.56,
      color: "#7C14C2",
      name: "Alimentação",
      tags: [
        {
          amount: 123.45,
          name: "Comida",
          color: "#ff0000",
        },
        {
          amount: 456.78,
          name: "Bebidas",
          color: "#00ff00",
        },
      ],
    },
    {
      amount: 5678.9,
      color: "#B5661C",
      name: "Transporte",
      tags: [
        {
          amount: 123.45,
          name: "Carro",
          color: "orange",
        },
        {
          amount: 456.78,
          name: "Ônibus",
          color: "pink",
        },
      ],
    },
    {
      amount: 3456.78,
      color: "#8EDBDC",
      name: "Lazer",
      tags: [
        {
          amount: 123.45,
          name: "Casa",
          color: "brown",
        },
        {
          amount: 456.78,
          name: "Praia",
          color: "gray",
        },
      ],
    },
  ],
};

export default function NewComponents() {
  return (
    <main className="grid grid-cols-4 gap-4 pl-36 pr-36 pt-12">
      <GraphButton text="View Graph" />
      <NextPrevButton isNext={false} onClick={() => console.log("Prev")} />
      <NextPrevButton isNext={true} onClick={() => console.log("Next")} />
      <div className="flex flex-col gap-2">
        <SideMenuButton
          icon={<Icons.dollarSign />}
          onClick={() => console.log("Adicionar Despesas")}
          label="Adicionar Despesas"
        />
        <SideMenuButton
          icon={<Icons.settings />}
          onClick={() => console.log("Configurações")}
          label="Configurações"
        />
        <SideMenuButton
          icon={<Icons.power />}
          onClick={() => console.log("Fechar")}
          label="Fechar"
        />
      </div>
      <CurrentMonthAmount amount={78994.45} month="Outubro" />
      <TagsInCategoriesByMonth
        months={months}
        years={years}
        categories={categoriesData}
      />
      <TagsDayToDay
        day="04"
        nameOfDay="Segunda-Feira"
        amount={1234.56}
        months={{
          label: "Mês",
          options: months,
          onChange: (value: string) => console.log(value),
          placeholder: "Mês",
        }}
        years={{
          label: "Ano",
          options: years,
          onChange: (value: string) => console.log(value),
          placeholder: "Ano",
        }}
        categories={categoriesData}
      />
    </main>
  );
}
