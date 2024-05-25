const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 8881;

app.use(
  cookieSession({
    name: "session",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:8881",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());

routes(app);

mongoose
  .connect(`${process.env.MONGODB}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
