import { useMutationWithAuth, useQueryWithAuth } from "../../hooks/auth";
import { useMoneyDateState } from "../../state/moneyDate";
import { useBillsRefetchListState } from "../../state/networkFirst";
import { formatMoneyAsNumber } from "../../utils/moneyUtils";
import { CREATE_BILL, GET_BILLS } from "../queries/bills";
import { billsSelector } from "../selectors/billsSelector";

export const useQueryBills = () => {
  const { moneyDate } = useMoneyDateState();
  const { checkIsInBillsRefetchList, removeFromBillsRefetchList } = useBillsRefetchListState();
  const options = { variables: moneyDate, fetchPolicy: 'cache-first' };

  if (checkIsInBillsRefetchList(moneyDate)) {
    options.fetchPolicy = 'network-only';
    options.onCompleted = () => {
      removeFromBillsRefetchList(moneyDate);
    }
  }

  const result = useQueryWithAuth(GET_BILLS, options);
  let data = null;
  if (result.data) data = billsSelector(result.data.bills);
  return { ...result, data };
};

export const useMutationCreateBill = () => {
  const { moneyDate: { month, year } } = useMoneyDateState();
  const [create] = useMutationWithAuth(CREATE_BILL);

  function createBill(bill) {
    if (bill.category === "") delete bill.category;
    if (bill.destination === "") delete bill.destination;
    if (typeof bill.dueDay === 'string') bill.dueDay = parseInt(bill.dueDay);
    if (Number.isNaN(bill.dueDay)) bill.dueDay = 1;
    if (typeof bill.amount === 'string') {
      const parsed = bill.amount.split('.').join('');
      bill.amount = formatMoneyAsNumber(parsed);
    }

    create({
      variables: { bill, month, year },
      update(cache, { data }) {
        const { bills } = cache.readQuery({
          query: GET_BILLS,
          variables: { month, year }
        });

        cache.writeQuery({
          query: GET_BILLS,
          data: { bills: [...bills, data.createBill] },
          variables: { month, year }
        });
      }
    });
  }

  return [createBill];
}
