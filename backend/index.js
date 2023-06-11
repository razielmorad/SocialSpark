require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const cors = require("cors");
const userAuth = require("./routes/auth");
const postRoute = require("./routes/posts");
const contactRoute = require("./routes/contact");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/social")
  .then(() => console.log("connected to mongoDB server"))
  .catch(() => console.log("could not connect to mongoDB"));

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/auth", userAuth);
app.use("/post", postRoute);

const PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
