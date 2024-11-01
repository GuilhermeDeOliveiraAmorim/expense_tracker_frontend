"use client";

import GraphButton from "@/components/ui/buttons/graph_button";
import NextPrevButton from "@/components/ui/buttons/next_prev_button";
import SideMenuButton from "@/components/ui/buttons/side_menu_button";
import { Icons } from "@/components/ui/icons";

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
    </main>
  );
}
