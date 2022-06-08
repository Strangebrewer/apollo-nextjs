import { IUser } from '../../../db/models';

const userQueries = {
  getCurrentUser: (_: unknown, __: unknown, { user }: { user: IUser }) => {
    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
    return user;
  }
};

export default userQueries;
