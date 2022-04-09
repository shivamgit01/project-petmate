const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const petRoute = require("./routes/petRoute");
const userRoute = require("./routes/userRoute");
const adoptRoute = require("./routes/adoptReqRoute");

const { cookie } = require("express/lib/response");

app.use("/api/v1", petRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", adoptRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
//Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
