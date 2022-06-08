import { AuthenticationError } from "apollo-server-express";
import { Bill, Transaction } from "../../../db/models";
import { Ctx, BillPayload, DefaultBillPayload, EditedBillPayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";
import { billPay } from "./utils";

const billMutations = {
  createBill: async (_: unknown, { bill }: BillPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    bill.user = user._id;
    const newBill = new Bill(bill);
    return await newBill.save();
  },

  updateBill: async (_: unknown, { id, bill }: BillPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const found = await Bill.findById(id);
    if (!found) throw new NotFoundError('bill not found');
    const updated = Object.assign(found, bill);
    return updated.save();
  },

  editedBillPay: async (_: unknown, payload: EditedBillPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const { id, amount, dueDay, month, year } = payload;
    const found = await Bill.findOne({ _id: id });
    if (!found) throw new NotFoundError(`bill ${id}`);
    await billPay({
      bill: { ...found.toObject(), amount, dueDay },
      month,
      year,
      user,
      edited: true
    });
    return found;
  },

  defaultBillPay: async (_: unknown, payload: DefaultBillPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    const { id, ...rest } = payload;
    const found = await Bill.findOne({ _id: id });
    if (!found) throw new NotFoundError(`bill ${id}`);
    await billPay({ ...rest, bill: found.toObject(), user });
    return found;
  },

  deleteBill: async (_: unknown, { id }: BillPayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    let found;
    const transactions = await Transaction.find({ bill: id });

    if (transactions.length) {
      found = await Bill.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
    } else {
      found = await Bill.findOneAndDelete({ _id: id });
    }

    if (!found) throw new NotFoundError('bill not found');
    return found;
  }
};

export default billMutations;
