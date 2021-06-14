import http from "http";
import app from "../index.js";

const { HOST } = process.env;

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App running on ${HOST}:${PORT}`);
});
