type TagsInCategoriesByMonthProps = {
  categories: React.ReactNode[];
};

export default function TagsInCategoriesByMonth({
  categories,
}: TagsInCategoriesByMonthProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] p-3 shadow-md">
      {categories.map((category, index) => (
        <div key={index}>{category}</div>
      ))}
    </div>
  );
}
