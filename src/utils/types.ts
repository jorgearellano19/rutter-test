import {Request} from 'express';

export interface CustomRequest<T = unknown> extends Request {
  payload?: T;
}

export interface PaginatedParams {
  page: number;
  size: number;
}
