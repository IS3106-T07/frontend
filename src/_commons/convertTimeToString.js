export const convertDateTime = (dateValue, isDateOnly) => {
  const date = new Date(dateValue);
  date.setSeconds(0, 0);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const dateString = (new Date(date.getTime() - tzOffset)).toISOString();
  if (isDateOnly) return dateString.split('T')[0];
  return dateString.split(':00.000Z')[0];
};
