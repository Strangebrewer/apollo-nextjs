import { ApolloError } from "apollo-server-express";

export const AUTH_ERROR_MESSAGE = 'You are not authorized to access this resource.';

export class NotFoundError extends ApolloError {
  readonly status: number = 404;
  readonly name: string = "NotFoundError";

  constructor(item: string) {
    super(`${item} not found`, "NOT_FOUND");
  }
}
