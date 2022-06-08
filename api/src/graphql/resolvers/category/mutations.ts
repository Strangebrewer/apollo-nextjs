import { AuthenticationError } from "apollo-server-express";
import { Bill, Category, Template, Transaction } from "../../../db/models";
import { Ctx, CategoryPayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";

const categoryMutations = {
  createCategory: async(_: unknown, { category }: CategoryPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    category.user = user._id;
    const newBill = new Category(category);
    return await newBill.save();
  },

  updateCategory: async(_: unknown, { id, category }: CategoryPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const found = await Category.findById(id);
    if (!found) throw new NotFoundError('category not found');
    const updated = Object.assign(found, category);
    return updated.save();
  },
  
  deleteCategory: async(_: unknown, { id }: CategoryPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const args = [{ category: id }, { $unset: { category: true } }];
    await Bill.updateMany(...args);
    await Transaction.updateMany(...args);
    await Template.updateMany(...args);

    const found = await Category.findOneAndDelete({ _id: id });
    if (!found) throw new NotFoundError('category not found');
    
    return found;
  }
};

export default categoryMutations;
