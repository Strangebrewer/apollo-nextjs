import { User, IUser } from '../../../db/models';
import slugify from 'slugify';
import userUtils from '../../../utils/userUtils';
import { ValidationError, AuthenticationError } from 'apollo-server';

const userMutations = {
  register: async (_: unknown, { user }: { user: IUser }) => {
    userUtils.validateEmail(user.email);
    userUtils.validateUsername(user.username);

    const emailIsTaken = await User.findOne({ normalizedEmail: user.email.toLowerCase() });
    if (emailIsTaken) {
      throw new ValidationError('That email address has already been used.');
    }

    const normalizedUsername = slugify(user.username, { lower: true });
    const userIsTaken = await User.findOne({ normalizedUsername });
    if (userIsTaken) {
      throw new ValidationError('That username is already taken.');
    }

    user.password = userUtils.hashPassword(user.password);
    user.username = slugify(user.username, ' ');
    user.normalizedEmail = user.email.toLowerCase();
    user.normalizedUsername = normalizedUsername;
    
    let newUser = new User(user);
    newUser = await newUser.save();
    return userUtils.tokenize(newUser);
  },

  login: async (_: unknown, { email, password }: { email: string, password: string }) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AuthenticationError('Something went wrong - please try again');
    }

    const isValid = userUtils.checkPassword(password, user.password);
    if (!isValid) {
      throw new AuthenticationError('Something went wrong - please try again');
    }
    
    return userUtils.tokenize(user);
  }
};

export default userMutations;
