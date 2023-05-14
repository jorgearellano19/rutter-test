import STATUS_CODES from './statusCodes';

export default function(data: any, statusCode = STATUS_CODES.OK) {
  return {
    statusCode,
    data,
  };
}
