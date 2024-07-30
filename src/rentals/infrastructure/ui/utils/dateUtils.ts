export const dateToString = (date: string): string => {
  const dateObject = new Date(date);

  // Obtener el mes y el día en UTC
  const month = dateObject.toLocaleString("es-MX", { month: "long", timeZone: "UTC" });
  const day = dateObject.getUTCDate();

  // Capitalizar el primer carácter del mes
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${formattedMonth} ${day}`;
};

export const howManyDays = (start_date: string, end_date: string): number => {
  const start = new Date(start_date);
  const end = new Date(end_date);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};