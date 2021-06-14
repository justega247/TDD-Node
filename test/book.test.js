import BookController from "../controllers/bookController.js";
import request from "supertest";
import { mockRequest, mockResponse } from "../utils/helper.js";
import {
  userOneToken,
  userTwoToken,
  userWithoutBookToken,
} from "../utils/token.js";
import app from "../index.js";
import { expect } from "@jest/globals";

let a;

describe("Book Controller Tests", () => {
  beforeEach(() => {
    a = "plop";
  });


  test("should create a new book", async () => {
    console.log(a)
    const bookDetails = {
      name: "Black Arrow",
      pages: 800,
    };

    const req = mockRequest(bookDetails, userOneToken);
    const res = mockResponse(1);

    await BookController.addBook(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "New Book Created",
      book: expect.objectContaining({
        id: expect.any(Number),
        name: bookDetails.name,
        pages: bookDetails.pages,
        userId: 1,
      }),
    });
  });

  test("should not create a book with missing fields", async () => {
    const bookDetails = {
      name: "",
      pages: 800,
    };

    const req = mockRequest(bookDetails, userOneToken);
    const res = mockResponse(1);

    await BookController.addBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Book creation Failed",
    });
  });

  it("should return all books by a user", async () => {
    console.log(a)
    const req = mockRequest();
    const res = mockResponse(2);

    await BookController.getUserBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Books by user",
      books: expect.arrayContaining([]),
    });
  });

  it("should return an error if no books were found", async () => {
    const req = mockRequest();
    const res = mockResponse(4);

    await BookController.getUserBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You do not have any books",
    });
  });
});

describe("Book Controller API Tests", () => {
  it("should create a new book", async () => {
    const bookDetails = {
      name: "Sudden Life",
      pages: 55,
    };

    const response = await request(app)
      .post("/api/v1/books/")
      .set("authorization", userTwoToken)
      .send(bookDetails);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New Book Created");
    expect(response.body.book.name).toBe(bookDetails.name);
    expect(response.body.book.id).toEqual(expect.any(Number));
  });

  it("should get all books by a user", async () => {
    const response = await request(app)
      .get("/api/v1/books/")
      .set("authorization", userOneToken);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Books by user");
  });

  it("should return an error if user has no books", async() => {
    const response = await request(app)
      .get("/api/v1/books/")
      .set("authorization", userWithoutBookToken);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("You do not have any books");
  })
});
