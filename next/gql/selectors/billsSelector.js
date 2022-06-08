
export const billsSelector = (bills = []) => {
  const totalPaid = bills.filter(b => b.transactions.present)
    .reduce((prev, curr) => prev + curr.amount, 0);
  const totalDue = bills.reduce((prev, curr) => prev + curr.amount, 0);
  console.log('totalPaid:::', totalPaid);
  console.log('totalDue:::', totalDue);

  return { bills, totalPaid, totalDue };
}