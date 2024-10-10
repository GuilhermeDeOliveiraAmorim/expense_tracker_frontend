import { format } from "date-fns";

export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date:", date);
    return "Invalid date";
  }

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Mês de 0-11, então somamos 1
  const dd = date.getDate();

  const ddStr = dd < 10 ? "0" + dd : String(dd);
  const mmStr = mm < 10 ? "0" + mm : String(mm);

  return `${ddStr}/${mmStr}/${yyyy}`;
};

export const formatDateDdMmYyyy = (date: string): string => {
  const dia = date.substring(0, 2);
  const mes = date.substring(2, 4);
  const ano = date.substring(4, 8);

  return `${dia}/${mes}/${ano}`;
};

type RangerDateType = {
  firstDayOfMonth?: boolean;
  today?: boolean;
  last7Days?: boolean;
  last30Days?: boolean;
  last90Days?: boolean;
  last1Year?: boolean;
};

export const rangerDate = ({
  firstDayOfMonth,
  today,
  last7Days,
  last30Days,
  last90Days,
  last1Year,
}: RangerDateType): string => {
  if (firstDayOfMonth) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return format(firstDay, "ddMMyyyy");
  } else if (today) {
    return format(new Date(), "ddMMyyyy");
  } else if (last7Days) {
    return format(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      "ddMMyyyy"
    );
  } else if (last30Days) {
    return format(
      new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      "ddMMyyyy"
    );
  } else if (last90Days) {
    return format(
      new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000),
      "ddMMyyyy"
    );
  } else if (last1Year) {
    return format(
      new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
      "ddMMyyyy"
    );
  }

  return format(new Date(), "ddMMyyyy");
};

export const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
