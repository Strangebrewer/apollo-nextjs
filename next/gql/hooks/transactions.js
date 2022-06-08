import { useMoneyDateState } from "../../state/moneyDate";
import { endOfMonth, startOfMonth, format } from "date-fns";
import { GET_TRANSACTIONS } from "../queries/transactions";
import { incomeSelector } from "../selectors/incomeSelector";
import { useQueryWithAuth } from "../../hooks/auth";

export const useQueryIncome = () => {
  const { moneyDate } = useMoneyDateState();
  let startDate = format(startOfMonth(new Date(moneyDate.year, moneyDate.month, 2)), 'yyyy-MM-dd');
  let endDate = format(endOfMonth(new Date(moneyDate.year, moneyDate.month, 2)), 'yyyy-MM-dd');

  const result = useQueryWithAuth(GET_TRANSACTIONS, {
    variables: {
      params: {
        income: true,
        startDate,
        endDate,
        pageSize: 100
      }
    }
  });
  let data = null;
  if (result.data) data = incomeSelector(result.data);

  return { ...result, data };
};
