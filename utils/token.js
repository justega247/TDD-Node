import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const { SECRET } = process.env;

export const userOneToken = jwt.sign({ id: 1 }, SECRET, {
  expiresIn: "1d",
});

export const userTwoToken = jwt.sign({ id: 1 }, SECRET, {
  expiresIn: "1d",
});

export const userWithoutBookToken = jwt.sign({ id: 4 }, SECRET, {
  expiresIn: "1d",
});

export const invalidUserToken = jwt.sign({ id: 44 }, SECRET, {
  expiresIn: "1d",
});
