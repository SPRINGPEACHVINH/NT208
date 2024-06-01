const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const passportSetup = require("./services/passport");
const authRoutes = require("./routes/AuthRouter");
dotenv.config();

const app = express();
const port = process.env.PORT || 8881;

app.use(
  cookieSession({
    name: "session",
    keys: ["TicketX88"],
    maxAge: 24 * 60 * 60 * 100,
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'https://ticketx88.vercel.app, http://localhost:8080',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use("/auth", authRoutes);

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
