type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-gray-100">
      {children}
    </div>
  );
}
