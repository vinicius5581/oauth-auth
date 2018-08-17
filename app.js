const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

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

// set up routes
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app is listening for requests on port 3000");
});
