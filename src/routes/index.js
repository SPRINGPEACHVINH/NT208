const UserRouter = require("./UserRouter");
const EventRouter = require("./EventRouter");
const TicketRouter = require("./TicketRouter");
const AuthRouter = require("./AuthRouter");
const MainMenuRouter = require("./MainMenuRouter");

const routes = (app) => {
  app.use("/", MainMenuRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/event", EventRouter);
  app.use("/api/ticket", TicketRouter);
  app.use("/auth", AuthRouter);
};

module.exports = routes;
