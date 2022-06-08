import { ObjectId } from 'mongoose';
import { IAccount, IBill, ICategory, INote, ITemplate, ITransaction, IUser } from "./db/models";
import { IImage } from './db/models/image';

// Incoming Queries:
type QueryParams = {
  pageSize?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  range?: string;
  fields?: string;
}
// END Incoming Queries



// Formatted Search Params:
type SearchParams = {
  date?: { $gte?: Date, $lte?: Date };
  $or?: [{ source: string }, { destination: string }];
  user: string;
}

type NoteSearchParams = SearchParams & {
  importance?: number;
}

type TransactionSearchParams = SearchParams & {
  bill?: string;
  isIncome?: boolean;
  category?: string;
}
// END Formatted Search Params



// Formatted Search Options:
type SearchOptions = {
  skip?: number;
  limit?: number;
  sort?: Record<string, 'asc' | 'desc'>;
}
// END Formatted Search Options


interface ILoader {
  one: (id: ObjectId) => Promise<IModel>;
  many: (ids: ObjectId[]) => Promise<IModel[]>;
}

type Ctx = {
  loaders: {
    account: ILoader;
    bill: ILoader;
    category: ILoader;
    image: ILoader;
    note: ILoader;
    template: ILoader;
    transaction: ILoader;
  };
  user: IUser;
}

type IModel = IAccount | IBill | ICategory | IImage | INote | ITemplate | ITransaction | IUser;

type AccountPayload = { id?: string, account: IAccount };
type DefaultBillPayload = { id: string, year: number, month: number };
type EditedBillPayload = { id: string, year: number, month: number, amount: number, dueDay: number };
type BillPayload = { id?: string, bill: IBill, year?: number, month?: number };
type CategoryPayload = { id?: string, category: ICategory };
type ImagePayload = { id?: string, image: IImage };
type NotePayload = { id?: string, note: INote };
type TemplatePayload = { id?: string, template: ITemplate, data: Partial<ITransaction> };
type TransactionPayload = { id?: string, transaction: ITransaction };
type UserPayload = { id?: string, user: IUser };