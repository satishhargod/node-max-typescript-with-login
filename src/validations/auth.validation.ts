import Joi from 'joi';
import { commonValidation, joiCommon } from './common.validation';
import { errorMessage } from './validation.constants';
const emailValidation = joiCommon.joiString
  .email({ ignoreLength: true })
  .min(8)
  .max(100)
  .label('Email')
  .messages({ ...errorMessage, 'string.email': '{#label} must be a valid email' })
  .lowercase()
  .required();

export const loginSchema = Joi.object({
  //email: Joi.string().email().allow('').required(),
  email: emailValidation,
  password: commonValidation.passwordCommon.label('Password'),
}).options({
  abortEarly: false,
});

export const forgotPasswordSchema = Joi.object({
  //email: Joi.string().email().allow('').required(),
  email: emailValidation,
}).options({
  abortEarly: false,
});

export const resetPasswordSchema = Joi.object({
  //email: Joi.string().email().allow('').required(),
  userId: joiCommon.joiString.required(),
  token: joiCommon.joiString.required(),
  password: commonValidation.passwordCommon.label('password'),
}).options({
  abortEarly: false,
});

export const updateProfileSchema = Joi.object({
  //name: joiCommon.joiString.required(),
}).options({
  abortEarly: false,
});

export const changePasswordSchema = Joi.object({
  oldpassword: joiCommon.joiString.required(),
  newpassword: commonValidation.passwordCommon.label('newpassword'),
}).options({
  abortEarly: false,
});