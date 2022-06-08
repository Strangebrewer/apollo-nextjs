import { ApolloError, AuthenticationError } from "apollo-server";
import { Template, IAccount, ITransaction, Transaction } from "../../../db/models";
import { Ctx, TransactionPayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";
import { adjustDestinationBalance, adjustSourceBalance } from '../account/utils';

type UpdateTransactionReturn = {
  originalSource?: IAccount;
  changedSource?: IAccount;
  originalDestination?: IAccount;
  changedDestination?: IAccount;
  transaction?: ITransaction;
}

type FromTemplateTransactionReturn = {
  destination?: IAccount;
  source?: IAccount;
  transaction?: ITransaction;
}

const transactionMutations = {
  createTransaction: async (_: unknown, { transaction }: TransactionPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    
    transaction.user = user._id;
    if (transaction.source) adjustSourceBalance(transaction);
    if (transaction.destination) adjustDestinationBalance(transaction);
    // TODO: see if anything needs to be done to modify date (or anything else, for that matter)
    const newTransaction = new Transaction(transaction);
    return await newTransaction.save();
  },

  createFromTemplate: async (_: unknown, payload: { id: string }, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const template = await Template.findById(payload.id);
    if (!template) throw new NotFoundError('template');

    const amount = template.amount;

    const { category, description, destination, source, transactionType, isIncome } = template;
    const txObject = { description, transactionType, amount, isIncome, user: user._id } as ITransaction;
    const toReturn: FromTemplateTransactionReturn = {};

    if (category) txObject.category = category;
    if (destination) {
      txObject.destination = destination;
      toReturn.destination = await adjustDestinationBalance(txObject);
    }
    if (source) {
      txObject.source = source;
      toReturn.source = await adjustSourceBalance(txObject);
    }

    try {
      toReturn.transaction = await Transaction.create(txObject);
      return toReturn;
    } catch (err) {
      // if creating the transaction fails, reverse the balance adjustments:
      if (destination) await adjustDestinationBalance(txObject, true);
      if (source) await adjustSourceBalance(txObject, true);
      throw new ApolloError('Something went wrong - please try again');
    }
  },

  updateTransaction: async (_: unknown, { id, transaction }: TransactionPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const original = await Transaction.findById(id);
    if (!original) throw new NotFoundError('transaction');
    const toReturn: UpdateTransactionReturn = {};

    if (original.source !== transaction.source)  {
      if (original.source) {
        toReturn.originalSource = await adjustSourceBalance(original, true);
      }

      if (transaction.source) {
        if (!transaction.amount) transaction.amount = original.amount;
        toReturn.changedSource = await adjustSourceBalance(transaction);
      }
    }

    if (original.destination !== transaction.destination) {
      if (original.destination) {
        toReturn.originalDestination = await adjustDestinationBalance(original, true);
      }

      if (transaction.destination) {
        if (!transaction.amount) transaction.amount = original.amount;
        toReturn.changedDestination = await adjustDestinationBalance(transaction);
      }
    }

    try {
      const updatedTransaction = Object.assign(original, transaction);
      toReturn.transaction = await updatedTransaction.save();
    } catch (err) {
      throw new ApolloError('Something went wrong - please try again');
    }
  },

  deleteTransaction: async (_: unknown, { id }: TransactionPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    
    let found = await Transaction.findOne({ _id: id });
    if (!found) throw new NotFoundError('transaction');

    if (found.source) {
      found.source = await adjustSourceBalance(found, true);
    }

    if (found.destination) {
      found.destination = await adjustDestinationBalance(found, true);
    }

    try {
      await Transaction.findOneAndRemove({ _id: id });
      return found;
    } catch (err) {
      if (typeof found.source === 'object') await adjustSourceBalance(found);
      if (typeof found.destination === 'object') await adjustDestinationBalance(found);
      throw new ApolloError('Something went wrong - please try again');
    }
  }
};

export default transactionMutations;
