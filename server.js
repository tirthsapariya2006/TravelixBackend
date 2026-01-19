const express = require("express");
const bodyParser = require("body-parser")
const db = require("./config/db")
const router = require("./router/tourRouter")
require("dotenv").config(); 

const app = express();

app.use(bodyParser.json());
app.use(router);

app.get("/",(req, res) => {
    res.status(200).send("hello");
});

db();

app.listen(3000,() => {
    console.log("http://localhost:3000");
});