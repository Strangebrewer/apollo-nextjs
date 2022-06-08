import { AuthenticationError } from "apollo-server-express";
import { Account } from "../../../db/models";
import { Ctx } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const accountQueries = {
  accounts: async (_: unknown, __: unknown, ctx: Ctx) => {
    if (!ctx.user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const accounts = await Account.find({ user: ctx.user._id });
    return ctx.loaders.account.many(accounts.map(({ _id }) => _id));
  },

  account: async (_: unknown, { id }: Record<string, any>, ctx: Ctx) => {
    if (!ctx.user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return ctx.loaders.account.one(id);
  }
};

export default accountQueries;
