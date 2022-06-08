
import { ApolloError } from 'apollo-server';
import { LeanDocument } from 'mongoose';
import { IAccount, IBill, ICategory, ITransaction, IUser, Transaction } from '../../../db/models';
import { adjustDestinationBalance, adjustSourceBalance } from '../account/utils';

type BillPay = {
  bill: LeanDocument<IBill>;
  user: LeanDocument<IUser>;
  edited?: boolean;
  year: number;
  month: number;
};

export async function billPay(data: BillPay) {
  const { bill, year, month, user, edited } = data;

  let transaction;
  const savedSource = await adjustSourceBalance(bill);
  let savedDestination;
  if (bill.destination) {
    savedDestination = await adjustDestinationBalance(bill);
  }

  try {
    const transactionData: Partial<ITransaction> = {
      amount: bill.amount,
      bill: bill._id,
      date: new Date(year, month, bill.dueDay),
      billDate: `${month} ${year}`,
      description: edited ? 'edited default payment' : 'default payment',
      source: savedSource,
      transactionType: 'expense',
      user: user._id
    };
    if (bill.category) transactionData.category = bill.category as ICategory | string;
    if (savedDestination) transactionData.destination = savedDestination as IAccount | string;

    transaction = await Transaction.create(transactionData);
  } catch (err) {
    // if the account balance updates but the transaction creation somehow fails, revert the balance change
    if (savedSource && !transaction) {
      adjustSourceBalance(bill, true);
    }
    console.log('err in defaultBillPay transaction create:::', err);
    throw new ApolloError('Something went wrong - please try again');
  }
}