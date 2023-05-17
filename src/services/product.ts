import { Response } from 'express';
import {CustomRequest, PaginatedParams} from '../utils/types';
import formatResponse from '../utils/formatResponse';

import prisma from '../prisma';
import { AppError } from '../error/app.error';
import STATUS_CODES from '../utils/statusCodes';

export const getProducts = async (req: CustomRequest<PaginatedParams>, res: Response) => {
  try {
    const {page = 1, size = 15} = req.payload as PaginatedParams;
    const products = await prisma.product.findMany({
      select: {
        id: true,
        platform_id: true,
        name: true,
      },
      skip: size * (page - 1),
      take: size,
    });
    res.send(formatResponse(products));
  } catch(err) {
    throw new AppError({
      httpCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      description: (err as any).message,
    })
  }
};
