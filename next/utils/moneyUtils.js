export function formatMoney(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    amount = 0;
  }
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}

export function formatMoneyAsNumber(amount) {
  const formatted = formatMoney(amount);
  const reformatted = formatted.substring(1).split('.').join('').split(',').join('');
  const parsed = parseInt(reformatted);
  if (Number.isNaN(parsed)) return 0;
  return parsed;
}
