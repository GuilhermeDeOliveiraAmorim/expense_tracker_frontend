"use client";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-4 text-center">
      <p>
        &copy;
        {new Date().getFullYear()} Meu Site. Todos os direitos reservados.
      </p>
    </footer>
  );
}
