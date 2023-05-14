import Joi, {ObjectSchema} from 'joi';

export const PaginationSchema: ObjectSchema = Joi.object({
  page: Joi.number().min(0).optional(),
  size: Joi.number().valid(15, 25, 50).optional(),
});
