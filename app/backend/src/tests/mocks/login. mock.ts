import TokenManager from "../../utils/TokenManager";
import { user1 } from "./user.mock";

const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const serviceResponseLogin200 = {
  statusCode: 200,
  data: {
    token: TokenManager.generate({
      id: user1.id,
      username: user1.username,
    }),
  },
}

const serviceResponseGetRole200 = {
  statusCode: 200,
  data: { role: user1.role },
}

export {
  login,
  serviceResponseLogin200,
  serviceResponseGetRole200
}