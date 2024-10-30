import CommomHeader from "@/components/layout/common/header/commonheader";
import Logo from "@/components/logo/logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Expense Tracker é uma ferramenta simples e poderosa para ajudar você a organizar e visualizar suas despesas com gráficos interativos para melhorar seu controle financeiro.",
};

export default function Home() {
  return (
    <div>
      <CommomHeader />

      <section className="bg-blue-600 text-white h-screen flex flex-col justify-center items-center text-center px-4">
        <Logo height="240" width="240" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Organize suas Finanças
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Cadastre suas despesas e tenha insights poderosos sobre seu orçamento.
        </p>
        <div>
          <a
            href="#cadastro"
            className="bg-white text-blue-600 py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition mr-4"
          >
            Cadastrar Despesas
          </a>
          <a
            href="#saiba-mais"
            className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Saiba Mais
          </a>
        </div>
      </section>

      <section id="saiba-mais" className="py-16 bg-gray-100 text-gray-800 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Saiba Mais sobre o Aplicativo
          </h2>
          <p className="text-lg mb-8">
            Nosso app ajuda você a cadastrar, organizar e visualizar suas
            despesas com gráficos interativos e para melhorar seu controle
            financeiro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Cadastro Simples</h3>
              <p>
                Cadastre suas despesas facilmente e tenha acesso a todas as suas
                movimentações financeiras em um único lugar.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Gráficos Detalhados
              </h3>
              <p>
                Visualize seus gastos com gráficos de fácil entendimento e
                compare suas despesas mês a mês.
              </p>
            </div>
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
