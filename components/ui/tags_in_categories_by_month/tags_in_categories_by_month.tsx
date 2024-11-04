"use client";

import SelectV2 from "../select_v2";
import TagsInCategoriesByMonthCategory from "./tags_in_categories_by_month_category";
import TagsInCategoriesByMonthTag from "./tags_in_categories_by_month_tag";

type Tag = {
  amount: number;
  name: string;
  color: string;
};

type Category = {
  amount: number;
  color: string;
  name: string;
  tags: Tag[];
};

export type CategoriesData = {
  categories: Category[];
};

type TagsInCategoriesByMonthProps = {
  categories: CategoriesData;
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
};

export default function TagsInCategoriesByMonth({
  categories,
  months,
  years,
}: TagsInCategoriesByMonthProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#EEF4ED] rounded-[12px] p-3 shadow-md">
      {categories.categories.map((category) => (
        <TagsInCategoriesByMonthCategory
          amount={category.amount}
          color={category.color}
          name={category.name}
          tags={category.tags.map((tag) => (
            <TagsInCategoriesByMonthTag
              amount={tag.amount}
              name={tag.name}
              key={tag.name}
              color={tag.color}
            />
          ))}
          key={category.name}
        />
      ))}
      <div className="flex gap-2">
        <SelectV2
          label="Month"
          placeholder="Select month"
          onChange={() => {}}
          options={months}
        />
        <SelectV2
          label="Year"
          placeholder="Select year"
          onChange={() => {}}
          options={years}
        />
      </div>
    </div>
  );
}
