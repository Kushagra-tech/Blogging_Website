const express = require("express");
const userRouter = require("./src/routes/user");
const postRouter = require("./src/routes/post");
const app = express();
const server = () => {
  app.use(express.json());
  app.use("/v1", userRouter);
  app.use("/v1", postRouter);
  return app;
};
module.exports = server;
