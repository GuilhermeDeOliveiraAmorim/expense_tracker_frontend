import { numberToBRL } from "@/components/util/money.handler";

type TagsInCategoriesByMonthTagProps = {
  color: string;
  name: string;
  amount: number;
};

export default function TagsInCategoriesByMonthTag({
  color,
  name,
  amount,
}: TagsInCategoriesByMonthTagProps) {
  return (
    <div
      style={{ borderColor: color }}
      className={`flex justify-between border-[2px] items-center py-[8px] px-[12px] w-full bg-white rounded-tr-[12px] rounded-br-[12px] mt-[10px]`}
    >
      <div className="pl-[12px] text-[#0B2545] font-semibold">{name}</div>
      <div className="pl-[12px] text-[#0B2545] font-semibold">
        {numberToBRL(amount)}
      </div>
    </div>
  );
}