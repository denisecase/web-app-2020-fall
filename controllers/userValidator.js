const { body, validationResult } = require('express-validator');
const LOG = require('../util/logger');

module.exports.checkValidationRules = () => {
  LOG.info('Starting user checkValidationRules.....');
  return [
    body('email', 'Email is required').isEmail(),
    body('password', '6-20 character password is required')
      .isLength({ min: 6 })
      .custom((val, req) => {
        if (val !== req.body.password2) {
          throw new Error('Passwords do not match');
        }
      }),
  ];
};

module.exports.validate = (req, res, next) => {
  LOG.info('Starting user validate.....');

  // see example of errors format at the end of this file
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  // return res.status(422).json({
  //   errors: extractedErrors,
  // });
  try {
    res.locals.errors = extractedErrors;
    return res.render('user/register.ejs', { title: 'Error', res });
  } catch (err) {
    return res.status(422).json({
      err,
    });
  }
};

/**
 * {
  "errors": [
    {
      "email": "Email is required"
    },
    {
      "password": "6-20 character password is required"
    },
    {
      "password": "value is not defined"
    }
  ]
}
 */
