import { atom, useRecoilState } from 'recoil';
import { getItemsToAdd } from './utils';

/**
 * Each bill also fetches any existing transactions for the current month/year and the previous two months.
 * Any time a bill is paid, the cache data (if it exists) for two subsequent months becomes stale
 *  and needs to be updated. This state item is used to keep track of which month/year combinations need updating.
 * When a bill is paid, the month/year for the next two months is added to this state. When a bills query is made,
 *  it checks here for that month/year first, and if it finds it, the query is marked "network-only" so it will
 *  pull from the database instead of the cache.
 * 
 * This seemed easier than trying to figure out how to find and update those particular items in the cache,
 *  and better than simply refetching all the data every time a bill is paid.
 */

export const BILLS_REFETCH_LIST_STATE = 'billsRefetchListState';

const initialState = atom({
  key: BILLS_REFETCH_LIST_STATE,
  default: []
});

export const useBillsRefetchListState = () => {
  const [billsRefetchList, setState] = useRecoilState(initialState);

  function addToBillsRefetchList(dateObject) {
    let items = getItemsToAdd(dateObject);
    setState([...billsRefetchList, ...items]);
  }

  function removeFromBillsRefetchList(dateObject) {
    const itemToRemove = `${dateObject.month} ${dateObject.year}`;
    let newState = billsRefetchList.filter(item => item !== itemToRemove);
    setState(newState);
  }

  function checkIsInBillsRefetchList(dateObject) {
    const itemToFind = `${dateObject.month} ${dateObject.year}`;
    const found = billsRefetchList.indexOf(itemToFind);
    return found !== -1;
  }

  return { addToBillsRefetchList, removeFromBillsRefetchList, checkIsInBillsRefetchList };
}