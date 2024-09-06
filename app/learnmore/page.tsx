import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo/logo";

export default function LearnMore() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-3">
            <Logo height="40" width="40" />
            <span className="text-xl font-bold text-gray-700">
              Expense Insight
            </span>
          </div>

          <div className="flex space-x-4">
            <Button>Cadastrar</Button>
            <Button>Login</Button>
          </div>
        </div>
      </header>

      <section id="saiba-mais" className="py-16 bg-gray-100 text-gray-800 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Expense Insight</h2>
          <p className="text-lg mb-8">
            Nosso app ajuda você a cadastrar, organizar e visualizar suas
            despesas com gráficos interativos e insights personalizados para
            melhorar seu controle financeiro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Cadastro Simples</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Cadastre suas despesas facilmente e tenha acesso a todas as
                  suas movimentações financeiras em um único lugar.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Gráficos Detalhados</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Visualize seus gastos com gráficos de fácil entendimento e
                  compare suas despesas mês a mês.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Insights</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Receba insights automáticos baseados nos seus hábitos de
                  gastos e dicas de economia personalizadas.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
