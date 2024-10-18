import { WeekExpenses } from "@/internal/presenters/get_expenses_by_month_year";
import { isDarkColor } from "../util/color.handler";

type MonthlyExpensesCardProps = {
  weeks: WeekExpenses[] | undefined;
};

export default function MonthlyExpensesCard({
  weeks,
}: MonthlyExpensesCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 w-full">
      {weeks?.map((week) =>
        week.days.map((day) => (
          <div
            key={day.day}
            className="flex flex-col justify-between items-center w-full text-center text-xs font-bold text-gray-600 border border-gray-300 rounded-t-lg"
          >
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex flex-row justify-between items-center w-full border-gray-300 border-b p-2 bg-gray-100 rounded-t-lg">
                <span className="text-center text-xs font-semibold text-gray-500">
                  {day.day}
                </span>
                <span className="text-center text-xs text-gray-500">
                  {day.day_name}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center w-full p-[2px] gap-[2px] h-full">
              {day.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="w-full flex flex-col justify-center items-center pt-1 pb-1 rounded-sm"
                  style={{
                    backgroundColor: tag.color,
                    color: isDarkColor(tag.color) ? "#ffffff" : "#1d1d1d",
                  }}
                >
                  {tag.name} (R$ {tag.total.toFixed(2).replace(".", ",")})
                </div>
              ))}
            </div>

            <div className="text-right font-bold p-2 text-gray-900 w-full bg-gray-100 border-gray-300 border-t">
              R$ {day.total.toFixed(2).replace(".", ",")}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
