import {Router} from 'express';
import {validatePagination} from '../middlewares/validatePagination';
import {getOrders} from '../services/orders';

export const ordersRouter = Router();

ordersRouter.get('/', validatePagination, getOrders);
