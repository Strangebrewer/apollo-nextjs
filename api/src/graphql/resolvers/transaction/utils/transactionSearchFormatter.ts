import { IUser } from "../../../../db/models";
import SearchOptionsFormatter from "../../../../utils/searchOptionsFormatter";
import { TransactionQueryParams } from "../queries";

export default class TransactionSearchFormatter extends SearchOptionsFormatter {
  constructor(user: IUser) {
    super(user);
  }

  format(params: TransactionQueryParams) {
    if (params.income) this.search.isIncome = true;
    if (params.bill) this.search.bill = params.bill;
    if (params.category) this.search.category = params.category;
    if (params.account) {
      this.search.$or = [{ source: params.account }, { destination: params.account }];
    }

    return super.format(params);
  }
}
