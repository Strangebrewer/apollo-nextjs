import { AuthenticationError } from "apollo-server-express";
import { Category } from "../../../db/models";
import { Ctx } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const categoryQueries = {
  categories: async (_: unknown, __: unknown, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Category.find({ user: user._id });
  },

  category: async (_: unknown, { id }: Record<string, any>, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Category.findById(id);
  }
};

export default categoryQueries;
