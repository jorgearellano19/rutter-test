import 'express-async-errors';
import {Response, Router, Request, NextFunction} from 'express';
import {errorHandler} from '../error/error.handler';

import {productRoute} from './product';
import { ordersRouter } from './orders';

export const router = Router();

router.use('/products', productRoute);
router.use('/orders', ordersRouter);
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  errorHandler.handleError(err, res);
});
