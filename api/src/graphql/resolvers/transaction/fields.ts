import { ITransaction } from "../../../db/models";
import { Ctx } from "../../../types";

const transactionFields = {
  Transaction: {
    category: async (transaction: ITransaction, _: unknown, { loaders }: Ctx) => {
      if (transaction.category)
        return loaders.category.one(transaction.category as any);
      return null;
    },
    destination: async (transaction: ITransaction, _: unknown, { loaders }: Ctx) => {
      if (transaction.destination)
        return loaders.account.one(transaction.destination as any);
      return null;
    },
    source: async (transaction: ITransaction, _: unknown, { loaders }: Ctx) => {
      if (transaction.source)
        return loaders.account.one(transaction.source as any);
      return null;
    },
  }
};

export default transactionFields;
