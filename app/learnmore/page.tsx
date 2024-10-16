import CommomHeader from "@/components/layout/common/header/commonheader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Learn More",
  description:
    "Learn more about Expense Insight, our simple and powerful app that helps you track, organize, and visualize your expenses with interactive graphs and personalized insights for better financial control.",
};

export default function LearnMore() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <CommomHeader />

      <section
        id="saiba-mais"
        className="py-16 bg-gray-100 text-gray-800 px-4 h-full"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Expense Insight</h2>
          <p className="text-lg mb-8">
            Nosso app ajuda você a cadastrar, organizar e visualizar suas
            despesas com gráficos interativos e para
            melhorar seu controle financeiro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Cadastro Simples</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Cadastre suas despesas facilmente e tenha acesso a todas as
                  suas movimentações financeiras em um único lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Gráficos Detalhados</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Visualize seus gastos com gráficos de fácil entendimento e
                  compare suas despesas mês a mês.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="cadastro"
        className="py-16 bg-blue-600 text-white text-center px-4"
      >
        <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
        <p className="text-lg mb-8">
          Cadastre suas despesas e comece a ter controle total sobre suas
          finanças.
        </p>
        <div>
          <a
            href="/signup"
            className="bg-white text-blue-600 py-3 px-6 rounded-full text-lg font-semibold mr-4 hover:bg-gray-100 transition"
          >
            Cadastrar Despesas
          </a>
          <a
            href="/learnmore"
            className="bg-gray-100 text-blue-600 py-3 px-6 rounded-full text-lg font-semibold hover:bg-white transition"
          >
            Saiba Mais
          </a>
        </div>
      </section>
    </div>
  );
}
