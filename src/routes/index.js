const UserRouter = require("./UserRouter");
const EventRouter = require("./EventRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/event", EventRouter);
};

module.exports = routes;
