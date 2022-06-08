import { ApolloError } from 'apollo-server';
import { Request } from 'express';
import { decode, JwtPayload } from 'jsonwebtoken';
import jws, { Algorithm } from 'jws';
import DataLoader from 'dataloader';
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new ApolloError('You must provide a jwt secret');
}

/** 
 * Keeping the loader stuff for future reference. The author of that article
 *  did mention that there isn't much point in using loaders for top-level queries;
 *  they're more useful for other queries (joins/populates, maybe).
 *  url: https://javascript.plainenglish.io/writing-a-node-js-graphql-backend-that-actually-scales-d20c920a4494
*/
import { Model } from 'mongoose';
import {
  Account,
  Bill,
  Category,
  Image,
  Note,
  Template,
  Transaction,
  User
} from '../db/models';
import { IModel } from '../types';

const createLoader = (model: Model<IModel>) => {
  const loader = new DataLoader(async (keys) => {
    const data = await model.find({ _id: { $in: keys } });

    const dataMap = data.reduce((acc: Record<string, IModel>, curr: IModel) => {
      acc[curr._id.toString()] = curr;
      return acc;
    }, {});

    return keys.map((id: unknown) => dataMap[id as string]);
  });

  return {
    one: async (id: string) => loader.load(id),
    many: async (ids: string[]) => loader.loadMany(ids.map((id) => id)),
  };
};

export default async function ({ req }: { req: Request }) {
  let isValid: boolean = false;
  let decoded: JwtPayload | null = null;
  const ctx: Record<string, unknown> = { user: null };
  let auth: string[] = [];

  if (req.headers && req.headers.authorization) {
    auth = req.headers.authorization.split(' ');
  }

  if (auth[0] === 'Bearer' && auth[1]) {
    decoded = decode(auth[1], { complete: true });
  }

  if (decoded && decoded.payload) {
    try {
      isValid = jws.verify(auth[1], decoded.header.alg as Algorithm, String(JWT_SECRET));

      if (isValid) {
        const user = await User.findById(decoded.payload.id);
        if (user) {
          const { password, ...rest } = user.toObject();
          ctx.user = rest;
        }
      }
    } catch (e) {
      return ctx;
    }
  }

  const loaders = {
    account: createLoader(Account as Model<IModel>),
    bill: createLoader(Bill as Model<IModel>),
    category: createLoader(Category as Model<IModel>),
    image: createLoader(Image as Model<IModel>),
    note: createLoader(Note as Model<IModel>),
    template: createLoader(Template as Model<IModel>),
    transaction: createLoader(Transaction as Model<IModel>),
    user: createLoader(User as Model<IModel>),
  };

  ctx.loaders = loaders;

  // anything that gets added to this will also need to be added to the Ctx type in types.d.ts
  return ctx;
}
