export const dateToString = (date: string): string => {
  const dateObject = new Date(date);
  let month = dateObject.toLocaleString("es-MX", { month: "long" });

  month = month.charAt(0).toUpperCase() + month.slice(1);
  const day = dateObject.getDate();
  return `${month} ${day}`;
};

export const howManyDays = (start_date: string, end_date: string): number => {
  const start = new Date(start_date);
  const end = new Date(end_date);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};