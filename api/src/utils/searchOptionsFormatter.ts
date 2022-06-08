import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { IUser } from '../db/models';
import { SearchOptions, SearchParams } from '../types';

export default class SearchOptionsFormatter {
  search: SearchParams & Record<string, any>;
  options: SearchOptions & Record<string, any>;
  start: String;
  end: String;

  constructor(user: IUser) {
    this.search = { user: user._id };
    this.options = {};
    this.start = '';
    this.end = '';
  }

  format(params: any) {
    let start;
    let end;

    if (params.startDate) start = startOfDay(new Date(params.startDate));
    if (params.endDate) end = endOfDay(new Date(params.endDate));
    if (params.range) {
      if (start) end = addDays(start, parseInt(params.range));
      else if (end) start = subDays(end, parseInt(params.range));
      else start = subDays(new Date(), parseInt(params.range));
    }

    if (start && end) {
      this.search.date = { $gte: start, $lte: end };
    } else if (start) {
      this.search.date = { $gte: start };
    } else if (end) {
      this.search.date = { $lte: end };
    }

    if (params.page && params.pageSize) {
      this.options.skip = params.pageSize * (params.page - 1);
      this.options.limit = params.pageSize;
    }

    // if (params.sort) this.options.sort = { date: params.sort }; 

    return { search: this.search, options: this.options }
  }
}