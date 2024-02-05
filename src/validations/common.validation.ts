// ** Package **
import Joi from 'joi';

// ** Others **
import { errorMessage } from './validation.constants';

export const joiCommon = {
  joiString: Joi.string()
    .trim()
    .messages({ ...errorMessage }),
  joiNumber: Joi.number().messages({ ...errorMessage }),
  joiBoolean: Joi.boolean().messages({ ...errorMessage }),
  joiDate: Joi.date()
    .iso()
    .messages({ ...errorMessage }),
  joiArray: Joi.array().messages({ ...errorMessage }),
  joiObject: Joi.object().messages({ ...errorMessage }),
  // ** For Pagination **
  joiPage: Joi.number()
    .messages({ ...errorMessage })
    .allow('', null),
  joiLimit: Joi.number().messages({ ...errorMessage }),
  joiFields: Joi.string()
    .messages({ ...errorMessage })
    .allow('', null),
  joiExclude: Joi.string()
    .messages({ ...errorMessage })
    .allow('', null),
  joiSort: Joi.object().messages({ ...errorMessage }),
  joiEmail: Joi.string()
    .messages({
      ...errorMessage,
      'string.email': '{#label} must be a valid email',
    })
    .email({ ignoreLength: true })
    .trim()
    .lowercase()
    .options({ convert: true }),
};

export const paramsIdSchema = Joi.object({
  id: joiCommon.joiNumber.required(),
}).options({
  abortEarly: false,
});

export const querySchema = Joi.object({
  toast: joiCommon.joiBoolean,
}).options({
  allowUnknown: true,
  abortEarly: false,
});

const passwordRegEx = '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$';
const numberRegex = '^[0-9]{9,10}$';
const codeRegex = '^([0|+[0-9]{1,5})$';

export const commonValidation = {
  passwordCommon: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp(passwordRegEx))
    .messages({
      ...errorMessage,
      'string.pattern.base': '{#label} shoud be  6 characters 1 uppercase, 1 lowercase and 1 special character'
    }),
  no: Joi.string()
    .required()
    .pattern(new RegExp(numberRegex))
    .label('Phone Number')
    .messages({ ...errorMessage, 'string.pattern.base': `{#label} must be number 9 or 10 digit` }),
  code: Joi.string()
    .required()
    .pattern(new RegExp(codeRegex))
    .label('Country Code')
    .messages({ ...errorMessage, 'string.pattern.base': `Please enter valid country code` }),
  pageContent: Joi.array().items(
    Joi.object({
      title: joiCommon.joiString.required(),
      description: joiCommon.joiString.required(),
      title_ar: joiCommon.joiString,
      description_ar: joiCommon.joiString,
    }),
  ),
};

export const trashSchema = Joi.object({
  allId: joiCommon.joiArray.items(joiCommon.joiNumber.strict()).required().min(1),
}).options({
  abortEarly: false,
});

export const paginationSchema = Joi.object({
  page: joiCommon.joiPage,
  limit: joiCommon.joiLimit,
  exclude: joiCommon.joiExclude,
}).options({ abortEarly: false });
