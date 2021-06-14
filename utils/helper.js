import bcrypt from "bcrypt"

export const hashPassword = (password, saltRounds = 10) => {
  const hash = bcrypt.hashSync(password, saltRounds)
  return hash
}

export const mockRequest = (body = {}, userToken = "") => ({
  body,
  headers: {
    authorization: userToken,
  },
});

export const mockResponse = (id = {}) => {
  const res = {
    locals: {
      user: {
        id,
      }
    }
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn();
