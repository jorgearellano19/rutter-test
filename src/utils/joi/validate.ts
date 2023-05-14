import {ObjectSchema} from 'joi';

export function validateSchema(body: unknown, joiSchema: ObjectSchema) {
  const {error} = joiSchema.validate(body);
  if (error) {
    return error.details.map((err) => err.message).join('. ');
  }
  return '';
}
