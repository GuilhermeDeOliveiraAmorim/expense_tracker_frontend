"use client";

import GraphButton from "@/components/ui/buttons/graph_button";
import NextPrevButton from "@/components/ui/buttons/next_prev_button";

export default function NewComponents() {
  return (
    <main className="grid grid-cols-4 gap-4 pl-36 pr-36 pt-12">
      <GraphButton text="View Graph" />
      <NextPrevButton isNext={false} onClick={() => console.log("Prev")} />
      <NextPrevButton isNext={true} onClick={() => console.log("Next")} />
    </main>
  );
}
