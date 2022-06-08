import { ApolloError, AuthenticationError } from "apollo-server-express";
import { Bill } from "../../../db/models";
import { Ctx } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const billQueries = {
  bills: async (_: unknown, __: unknown, { user, loaders }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    try {
      const bills = await Bill.find({ user: user._id });
      return loaders.bill.many(bills.map(({ _id }) => _id));
    } catch (err) {
      throw new ApolloError('Something went wrong - please try again');
    }
  },

  bill: async (_: unknown, { id }: Record<string, any>, { user, loaders }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return loaders.bill.one(id);
  }
};

export default billQueries;
