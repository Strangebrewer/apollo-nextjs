import { AuthenticationError } from "apollo-server-express";
import { Image } from "../../../db/models";
import { Ctx, ImagePayload } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";

const imageMutations = {
  createImage: async (_: unknown, { image }: ImagePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    image.user = user._id;
    let newImage = new Image(image);
    newImage = await newImage.save();

    return newImage;
  },

  deleteImage: async (_: unknown, { id }: ImagePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Image.findOneAndDelete({ _id: id });
  }
};

export default imageMutations;
