
export function dueDayFormatter(day) {
  const st = [1,21,31];
  const nd = [2,22];
  const rd = [3,23]
  if (st.includes(day)) return day + 'st';
  if (nd.includes(day)) return day + 'nd';
  if (rd.includes(day)) return day + 'rd';
  return day + 'th';
}
