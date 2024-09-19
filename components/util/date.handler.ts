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
