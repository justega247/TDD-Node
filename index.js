import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/books/", bookRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to madagascar",
  });
});

app.get("*", (req, res) => {
  return res.status(400).json({
    message: "You visited a wrong URL",
  });
});

export default app;
