import { AuthenticationError } from "apollo-server-express";
import { Image } from "../../../db/models";
import { Ctx } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const imageQueries = {
  images: async (_:unknown, __: unknown, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Image.find({ user: user._id });
  },

  image: async(_: unknown, { id }: Record<string, any>, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Image.findById(id);
  }
};

export default imageQueries;
