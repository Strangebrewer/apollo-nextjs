import { IUser } from "../../../../db/models";
import SearchOptionsFormatter from "../../../../utils/searchOptionsFormatter";
import { NoteQueryParams } from "../queries";

export default class NoteSearchFormatter extends SearchOptionsFormatter {
  constructor(user: IUser) {
    super(user);
  }

  format(params: NoteQueryParams) {
    if (params.importance) this.search.importance = params.importance;
    this.options.sort = { importance: 'asc' };
    return super.format(params);
  }
}