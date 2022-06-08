import { AuthenticationError } from "apollo-server-express";
import { Note } from "../../../db/models";
import { Ctx, QueryParams } from "../../../types";
import { AUTH_ERROR_MESSAGE } from "../../../utils/errors";
import NoteSearchFormatter from "./utils/noteSearchFormatter";

export type NoteQueryParams = QueryParams & {
  importance?: number;
}

const noteQueries = {
  notes: async (_: unknown, { params }: { params: NoteQueryParams }, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const { page, pageSize, fields } = params;

    const formatter = new NoteSearchFormatter(user);
    const { search, options } = formatter.format(params);

    return {
      result: async () => {
        return await Note.find(search, fields, options);
      },
      info: async () => {
        const count = await Note.countDocuments(search);
        let pages;
        let prev;
        let next;
        if (page && pageSize) {
          pages = Math.ceil(count / pageSize);
          prev = page > 1 ? page - 1 : null;
          next = page < pages ? page + 1 : null;
        }
        return { count, pages, prev, next };
      }
    }
  },

  note: async (_: unknown, { id }: Record<string, any>, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Note.findById(id);
  }
};

export default noteQueries;
