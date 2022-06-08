
export const incomeSelector = (data = {}) => {
  const { transactions } = data;
  const incomeTotal = transactions.results?.reduce((prev, curr) => prev + curr.amount, 0);
  return { incomeTotal, transactions };
};
