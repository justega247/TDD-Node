import UserController from "../controllers/userController.js";
import request from "supertest";
import user from "../data/user";
import app from "../index.js";
import { mockRequest, mockResponse } from "../utils/helper.js";


describe("User Controller Tests", () => {
  it("should create a new user with valid details", async () => {
    const userDetails = {
      firstName: "Caleb",
      lastName: "Anvil",
      email: "caleba@mail.com",
    };

    const userArrayLength = user.length;
    const req = mockRequest(userDetails, {});

    const res = mockResponse();

    await UserController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "New user created",
      user: {
        id: userArrayLength + 1,
        ...userDetails,
      },
      token: expect.any(String)
    });
    expect(userArrayLength).not.toBe(user.length);
  });

  it("should return an error with existing email provided", async () => {
    const existingEmail = user[0].email;

    const userDetails = {
      firstName: "Nobel",
      lastName: "Young",
      email: existingEmail,
    };

    const req = mockRequest(userDetails, {});
    const res = mockResponse();

    const userArrayLength = user.length;

    await UserController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "A user with this email already exists",
    });
    expect(userArrayLength).toBe(user.length);
  });

  it("should login a user with valid details", async() => {
    const {id, firstName, lastName, email } = user[0]
    const loginCredentials = {
      email: user[0].email,
      password: "plumpy"
    }

    const req = mockRequest(loginCredentials, {})
    const res = mockResponse()

    await UserController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      id,
      firstName,
      lastName,
      email
    })
  })

  it("should return an error when invalid credentials are provided", async() => {
    const fakeDetails = {
      email: "fake@email.com",
      password: "fakest"
    }

    const req = mockRequest(fakeDetails);
    const res = mockResponse();

    await UserController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found"
    })
  })
});

describe("User API Test", () => {
  it("should create a new user", async () => {
    const userDetails = {
      firstName: "Nobel",
      lastName: "Young",
      email: "nobely@gmail.com",
    };

    const userResponse = await request(app)
      .post("/api/v1/user/signup")
      .send(userDetails);

    expect(userResponse.status).toBe(201);
    expect(userResponse.body.message).toBe("New user created");
    expect(userResponse.body.user.firstName).toBe("Nobel");
  });

  it("should return an error when duplicate email is supplied", async () => {
    const existingEmail = user[0].email;

    const userDetails = {
      firstName: "Nobel",
      lastName: "Young",
      email: existingEmail,
    };

    const response = await request(app)
      .post("/api/v1/user/signup")
      .send(userDetails);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A user with this email already exists")
  });
});
