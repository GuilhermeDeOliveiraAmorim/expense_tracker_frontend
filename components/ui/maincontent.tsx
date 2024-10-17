type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex flex-col p-2 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 gap-2 w-full flex-grow bg-gray-100">
      {children}
    </main>
  );
}
