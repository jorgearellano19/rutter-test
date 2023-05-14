import {Router} from 'express';
import {validatePagination} from '../middlewares/validatePagination';

import {getProducts} from '../services/product';

export const productRoute = Router();

productRoute.get('/', validatePagination, getProducts);
