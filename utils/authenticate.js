import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import userArray from "../data/user.js"

config();

const { SECRET } = process.env;

class Authenticate {
  static authenticateUser = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      let userId;

      if (token) {
        verify(token, SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              message: "Invalid token provided"
            })
          }
          res.locals.user = decoded;
          userId = res.locals.user.id
        })
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'Please add your token'
        });
      }

      const loggedInUser = userArray.find(aUser => {
        return aUser.id === userId
      })

      if(!loggedInUser) {
        throw new Error("Please login again")
      };

      next();

    } catch (e) {
      return res.status(401).json({
        message: e.message
      })
    }
  }
}

export default Authenticate
