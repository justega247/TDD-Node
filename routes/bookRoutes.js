import express from "express";
import BookController from "../controllers/bookController";
import Authenticate from "../utils/authenticate";

const router = express.Router();

router.post("/", Authenticate.authenticateUser, BookController.addBook)
router.get("/", Authenticate.authenticateUser, BookController.getUserBooks)

export default router;
