import { accountMutations, accountQueries } from './account';
import { billFields, billMutations, billQueries } from './bill';
import { categoryFields, categoryMutations, categoryQueries } from './category';
import { imageFields, imageMutations, imageQueries } from './image';
import { noteFields, noteMutations, noteQueries } from './note';
import { templateFields, templateMutations, templateQueries } from './template';
import { transactionFields, transactionMutations, transactionQueries } from './transaction';
import { userMutations, userQueries } from './user';

const resolvers = {
  Query: {
    ...accountQueries,
    ...billQueries,
    ...categoryQueries,
    ...imageQueries,
    ...noteQueries,
    ...templateQueries,
    ...transactionQueries,
    ...userQueries,
  },
  Mutation: {
    ...accountMutations,
    ...billMutations,
    ...categoryMutations,
    ...imageMutations,
    ...noteMutations,
    ...templateMutations,
    ...transactionMutations,
    ...userMutations,
  },
  ...billFields,
  ...categoryFields,
  ...imageFields,
  ...noteFields,
  ...templateFields,
  ...transactionFields
};

export default resolvers;
