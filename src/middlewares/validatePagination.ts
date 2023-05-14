import {AppError} from '../error/app.error';
import {NextFunction, Response} from 'express';
import {PaginationSchema} from '../utils/joi';
import {validateSchema} from '../utils/joi/validate';
import STATUS_CODES from '../utils/statusCodes';
import {CustomRequest, PaginatedParams} from '../utils/types';

export function validatePagination(req: CustomRequest<PaginatedParams>, _res: Response, next: NextFunction) {
  const {page = 1, size = 15} = req.query;
  const error = validateSchema({page, size}, PaginationSchema);
  if (error) {
    throw new AppError({
      httpCode: STATUS_CODES.BAD_REQUEST,
      description: error,
    });
  }
  req.payload = {
    page: parseInt(page as string),
    size: parseInt(size as string),
  };
  next();
}
