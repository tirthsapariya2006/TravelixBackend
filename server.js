const express = require("express");
const bodyParser = require("body-parser")
const db = require("./config/db")
const tourRouter = require("./routes/tourRouter")
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors")
require("dotenv").config(); 

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/",(req, res) => {
    res.status(200).send("hello");
});

db();

app.use("/api/tour", tourRouter);

app.use("/api/user", userRoutes);

app.use("/api/cart", cartRoutes);

app.listen(3000,() => {
    console.log("http://localhost:3000");
});