import TokenManager from "../../utils/TokenManager";
import { user1 } from "./user.mock";

const login = {
  email: 'arthur@gmail.com',
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

export {
  login,
  serviceResponseLogin200,
}