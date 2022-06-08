import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const { JWT_SECRET } = process.env;
import { UserInputError, ApolloError } from 'apollo-server';
import { IUser } from '../db/models';

export default {
  validateUsername(username: string) {
    if (!username) throw new UserInputError('You must choose a username');
    let test = /^[ A-Za-z0-9\s]*$/.test(username);
    if (!test) throw new UserInputError('Usernames must be only letters, numbers, and spaces');
  },

  validateEmail(email: string) {
    if (!email) throw new UserInputError('You must provide an email address');
    const test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (!test) throw new UserInputError('That is not a valid email.');
  },

  checkPassword(given: string, original: string) {
    return bcrypt.compareSync(given, original);
  },

  hashPassword(plainTextPassword: string) {
    return bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10));
  },

  sign(payload: { id: string, email: string }) {
    if (!JWT_SECRET || typeof JWT_SECRET !== 'string') {
      throw new ApolloError('You must provide a jwt secret');
    }
    return jwt.sign(payload, JWT_SECRET);
  },

  tokenize(partialUser: IUser) {
    const { _id, email, username } = partialUser;
    const user = { _id, email, username };
    const token = this.sign({ id: user._id, email: user.email });
    return { token, user };
  }
}