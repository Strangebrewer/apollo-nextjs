import { AuthenticationError } from "apollo-server-express";
import { Account, Bill, Template, Transaction } from "../../../db/models";
import { Ctx, AccountPayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";

const accountMutations = {
  createAccount: async (_: unknown, { account }: AccountPayload, { loaders, user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    account.user = user._id;
    const newAccount = new Account(account);
    const saved = await newAccount.save();
    return loaders.account.one(saved._id);
  },

  updateAccount: async(_: unknown, { id, account }: AccountPayload, { loaders, user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const found = await Account.findById(id);
    if (!found) throw new NotFoundError('account not found');

    let updated = Object.assign(found, account);
    updated = await updated.save();

    return loaders.account.one(updated._id);
  },
  
  deleteAccount: async(_: unknown, { id }: AccountPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    
    const found = await Account.findOneAndDelete({ _id: id });
    if (!found) throw new NotFoundError('account not found');

    await Transaction.updateMany({ source: id }, { $unset: { source: true } });
    await Transaction.updateMany({ destination: id }, { $unset: { destination: true } });
    await Bill.updateMany({ source: id }, { $unset: { source: true } });
    await Template.updateMany({ source: id }, { $unset: { source: true } });
    await Template.updateMany({ destination: id }, { $unset: { destination: true } });
    
    return found;
  }
};

export default accountMutations;
