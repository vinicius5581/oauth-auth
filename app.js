const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// connect to mongodb
mongoose.connect(
  "mongodb://" +
    keys.mongodb.MONGO_US +
    ":" +
    keys.mongodb.MONGO_PW +
    "@localhost:27017/oauth-playlist",
  {
    useNewUrlParser: true
  },
  () => {
    console.log("connected to mongodb");
  }
);

// set up view engine
app.set("view engine", "ejs");

// set up cookieSession
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app is listening for requests on port 3000");
});
