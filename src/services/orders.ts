import {Response } from 'express';
import {CustomRequest, PaginatedParams} from '../utils/types';
import formatResponse from '../utils/formatResponse';

import prisma from '../prisma';

export const getOrders = async (req: CustomRequest<PaginatedParams>, res: Response) => {
  const { page, size } = req.payload as PaginatedParams;
  const orders = await prisma.order.findMany({
    select: {
      line_items: {
        select: {
          product_id: true,
        },
      },
      id: true,
      platform_id: true,
    },
    skip: size * (page - 1),
    take: size,
  });
  res.send(formatResponse(orders));
};
