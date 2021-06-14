import bcrypt from "bcrypt";
import userArray from "../data/user";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const { SECRET, TOKEN_EXPIRATION_TIME } = process.env;

class UserController {
  static addUser = (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
      const existingUser = userArray.find((aUser) => {
        return aUser.email === email;
      });

      if (!existingUser) {
        const newUserDetails = {
          id: userArray.length + 1,
          firstName,
          lastName,
          email,
        };

        const token = sign({ id: newUserDetails.id }, SECRET, {
          expiresIn: TOKEN_EXPIRATION_TIME,
        });

        userArray.push(newUserDetails);

        return res.status(201).json({
          message: "New user created",
          user: newUserDetails,
          token,
        });
      } else {
        throw new Error("A user with this email already exists");
      }
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      });
    }
  };

  static login = (req, res) => {
    const { email, password } = req.body;

    try {
      const userWithEmail = userArray.find((aUser) => {
        return aUser.email === email;
      });

      if (userWithEmail) {
        const { password: userPassword } = userWithEmail;

        if (bcrypt.compareSync(password, userPassword)) {
          const { password, ...userDetail } = userWithEmail;
          return res.status(200).json(userDetail);
        }
      }

      throw new Error("User not found");
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
}

export default UserController;
