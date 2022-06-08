import { AuthenticationError } from "apollo-server-express";
import { Template } from "../../../db/models";
import { Ctx } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const templateQueries = {
  templates: async (_: unknown, __: unknown, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Template.find({ user: user._id });
  },

  template: async (_: unknown, { id }: Record<string, any>, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Template.findById(id);
    // return ctx.loaders.template.one(id);
  }
};

export default templateQueries;
