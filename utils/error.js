const STATUS_CODES = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  NotAcceptable: 406,
  Conflict: 409,
  ServerError: 500,
  DuplicateError: 11000,
};

module.exports = STATUS_CODES;
