import { numberToBRL } from "@/components/util/money.handler";

type CurrentMonthAmountProps = {
  amount: number;
  month: string;
};

export function CurrentMonthAmount({ amount, month }: CurrentMonthAmountProps) {
  return (
    <div className="relative">
      <div className="absolute -top-2 right-4 bg-[#134074] text-[30px] text-[#EEF4ED] rounded-[12px] px-8 py-3 h-[70px] shadow-md">
        {numberToBRL(amount)}
      </div>
      <div className=" bg-[#EEF4ED] rounded-[12px] pl-3 pt-3 pb-3 shadow-md">
        <span className="text-[20px] font-bold text-center text-[#0B2545]">
          {month}
        </span>
      </div>
    </div>
  );
}
