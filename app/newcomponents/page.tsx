"use client";

import GraphButton from "@/components/ui/buttons/graph_button";
import NextPrevButton from "@/components/ui/buttons/next_prev_button";
import SideMenuButton from "@/components/ui/buttons/side_menu_button";
import { CurrentMonthAmount } from "@/components/ui/current_month_amount/current_month_amount";
import { Icons } from "@/components/ui/icons";
import TagsInCategoriesByMonth from "@/components/ui/tags_in_categories_by_month/tags_in_categories_by_month";
import TagsInCategoriesByMonthCategory from "@/components/ui/tags_in_categories_by_month/tags_in_categories_by_month_category";
import TagsInCategoriesByMonthTag from "@/components/ui/tags_in_categories_by_month/tags_in_categories_by_month_tag";

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
      <CurrentMonthAmount amount={78994.45} month="Setembro" />
      <TagsInCategoriesByMonth
        categories={[
          <TagsInCategoriesByMonthCategory
            amount={1234.56}
            color="#7C14C2"
            name="Alimentação"
            tags={[
              <TagsInCategoriesByMonthTag
                amount={123.45}
                name="Comida"
                key={"Comida"}
                color="#ff0000"
              />,
              <TagsInCategoriesByMonthTag
                amount={456.78}
                name="Bebidas"
                key={"Bebidas"}
                color="#00ff00"
              />,
            ]}
            key={"Alimentação"}
          />,
          <TagsInCategoriesByMonthCategory
            amount={5678.9}
            color="#B5661C"
            name="Transporte"
            tags={[
              <TagsInCategoriesByMonthTag
                amount={123.45}
                name="Carro"
                key={"Carro"}
                color="orange"
              />,
              <TagsInCategoriesByMonthTag
                amount={456.78}
                name="Ônibus"
                key={"Ônibus"}
                color="pink"
              />,
            ]}
            key={"Transporte"}
          />,
          <TagsInCategoriesByMonthCategory
            amount={3456.78}
            color="#8EDBDC"
            name="Lazer"
            tags={[
              <TagsInCategoriesByMonthTag
                amount={123.45}
                name="Casa"
                key={"Casa"}
                color="brown"
              />,
              <TagsInCategoriesByMonthTag
                amount={456.78}
                name="Praia"
                key={"Praia"}
                color="gray"
              />,
            ]}
            key={"Lazer"}
          />,
        ]}
      />
    </main>
  );
}
