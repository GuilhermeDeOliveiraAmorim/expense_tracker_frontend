export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Meu Site</h1>
      </header>

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

        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-4">Conteúdo Principal</h2>
          <p>Este é o espaço onde o conteúdo principal será exibido.</p>
        </main>
      </div>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
