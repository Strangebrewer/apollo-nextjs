import { AuthenticationError } from "apollo-server-express";
import { Transaction } from "../../../db/models";
import { Ctx, QueryParams } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";
import FormatTransactionSearch from "./utils/transactionSearchFormatter";

export type TransactionQueryParams = QueryParams & {
  account?: string;
  income?: boolean;
  bill?: string;
  category?: string;
}

const transactionQueries = {
  transactions: async (_: unknown, { params }: { params: TransactionQueryParams }, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const { page, pageSize, fields } = params;

    const formatter = new FormatTransactionSearch(user);
    const { search, options } = formatter.format(params);

    return {
      results: async () => {
        const transactions = await Transaction.find(search, fields, options)

        /** 
         * Keeping the loader stuff for future reference. The author of that article
         * did mention that there isn't much point in using loaders for top-level queries
         * like this; they're more useful for other queries (joins and populates, maybe).
         * url: https://javascript.plainenglish.io/writing-a-node-js-graphql-backend-that-actually-scales-d20c920a4494
        */
        // return ctx.loaders.transaction.many(transactions.map((a: ITransaction) => a.id));

        return transactions;
      },
      info: async () => {
        const count = await Transaction.countDocuments(search);
        let pages;
        let prev;
        let next;
        if (page && pageSize) {
          pages = Math.ceil(count / pageSize);
          prev = page > 1 ? page - 1 : null;
          next = page < pages ? page + 1 : null;
        }
        return { count, pages, prev, next };
      }
    }
  },

  transaction: async (_: unknown, { id }: Record<string, any>, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Transaction.findById(id);
    // return ctx.loaders.transaction.one(id);
  }
};

export default transactionQueries;
