import Authenticate from "../utils/authenticate.js";
import { mockRequest, mockResponse, mockNext } from "../utils/helper.js";
import { userOneToken } from "../utils/token.js";

describe("Authenticate User", () => {
  it("should not authenticate an invalid token", () => {
    const req = mockRequest({}, `${userOneToken}invalid`);
    const res = mockResponse();
    const next = mockNext();

    Authenticate.authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token provided",
    });
  });

  it("should call the next function if valid token", () => {
    const req = mockRequest({}, userOneToken);
    const res = mockResponse();
    const next = mockNext();

    Authenticate.authenticateUser(req, res, next);

    expect(next).toHaveBeenCalled()
  });
});
