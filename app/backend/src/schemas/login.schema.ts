import * as Joi from 'joi';
import { ILogin } from '../Interfaces/ILogin';

const login: Joi.ObjectSchema<ILogin> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default {
  login,
};
