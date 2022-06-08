import { ApolloError } from "apollo-server-express";
import { Account, IAccount, IBill, ITransaction } from "../../../db/models";
import { NotFoundError } from "../../../utils/errors";
import { LeanDocument } from 'mongoose';

export function add(account: IAccount, amount: number) {
  account.balance = account.balance + amount;
  try {
    return account.save();    
  } catch (err) {
    throw new ApolloError('Something went wrong - please try again');
  }
}

export function subtract(account: IAccount, amount: number) {
  account.balance = account.balance - amount;
  try {
    return account.save();    
  } catch (err) {
    throw new ApolloError('Something went wrong - please try again');
  }
}

export async function adjustSourceBalance(transaction: LeanDocument<ITransaction | IBill>, reverse?: boolean) {
  const source = await Account.findOne({ _id: transaction.source });
  if (!source) throw new NotFoundError('account');

  if (source && source.accountType === 'asset') {
    if (reverse) return add(source, transaction.amount);
    return subtract(source, transaction.amount);
  }
  if (source && source.accountType === 'debt') {
    if (reverse) return subtract(source, transaction.amount);
    return add(source, transaction.amount);
  }
}

export async function adjustDestinationBalance(transaction: LeanDocument<ITransaction | IBill>, reverse?: boolean) {
  const destination = await Account.findOne({ _id: transaction.destination });
  if (!destination) throw new NotFoundError('account');

  if (destination && destination.accountType === 'asset') {
    if (reverse) return subtract(destination, transaction.amount);
    return add(destination, transaction.amount);
  }
  if (destination && destination.accountType === 'debt') {
    if (reverse) return add(destination, transaction.amount);
    return subtract(destination, transaction.amount);
  }
}