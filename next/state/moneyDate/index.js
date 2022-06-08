import { atom, useRecoilState } from 'recoil';
import { getDateObject } from './utils';

export const MONEY_DATE_STATE = 'moneyDateState';

const initialState = atom({
  key: MONEY_DATE_STATE,
  default: getDateObject()
});

export const useMoneyDateState = () => {
  const [moneyDate, setState] = useRecoilState(initialState);

  function setMoneyDate(dateObject) {
    const { day, month, year } = dateObject;
    if (!day) dateObject.day = 1;
    if (!month || !year) {
      const now = new Date();
      if (!month && month !== 0) dateObject.month = now.getMonth();
      if (!year) dateObject.year = now.getFullYear();
    }
    setState(dateObject);
  }

  return { moneyDate, setMoneyDate };
};
