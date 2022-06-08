import { IBill, ITransaction, Transaction } from "../../../db/models";
import { QueryParams, Ctx } from "../../../types";

export type BillQueryParams = QueryParams & {
  year: number;
  month: number;
}

export type BillTransactionsObject = {
  present?: ITransaction;
  pastOne?: ITransaction;
  pastTwo?: ITransaction;
}

const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};

const billFields = {
  Bill: {
    category: async (bill: IBill, _: unknown, { loaders }: Ctx) => {
      if (bill.category)
        return loaders.category.one(bill.category as any);
      return null;
    },
    source: async (bill: IBill, _: unknown, { loaders }: Ctx) => {
      if (bill.source)
        return loaders.account.one(bill.source as any);
      return null;
    },
    destination: async (bill: IBill, _: unknown, { loaders }: Ctx) => {
      if (bill.destination)
        return loaders.account.one(bill.destination as any);
      return null;
    },
    transactions: async (bill: IBill, { month, year }: BillQueryParams) => {
      let lastMonth = month - 1;
      let twoMonthsAgo = month - 2;
      let lastMonthYear = year;
      let twoMonthsAgoYear = year;

      if (month === MONTHS.Feb) {
        twoMonthsAgo = MONTHS.Dec;
        twoMonthsAgoYear = year - 1;
      }
      
      if (month === MONTHS.Jan) {
        lastMonth = MONTHS.Dec;
        lastMonthYear = year - 1;
        twoMonthsAgo = MONTHS.Nov;
        twoMonthsAgoYear = year - 1;
      }

      const present = await Transaction.findOne({
        bill: bill._id,
        billDate: `${month} ${year}`
      });
      const pastOne = await Transaction.findOne({
        bill: bill._id,
        billDate: `${lastMonth} ${lastMonthYear}`
      });
      const pastTwo = await Transaction.findOne({
        bill: bill._id,
        billDate: `${twoMonthsAgo} ${twoMonthsAgoYear}`
      });

      const transactions: BillTransactionsObject = {};
      if (present) transactions.present = present;
      if (pastOne) transactions.pastOne = pastOne;
      if (pastTwo) transactions.pastTwo = pastTwo;

      return transactions;
    }
  }
}

export default billFields;
