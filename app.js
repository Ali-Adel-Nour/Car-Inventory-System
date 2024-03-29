const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConfig');
const allRouter = require('./routes/allRoutes');
const { notFound, handleError } = require('./middleware/errorHandler');

app.get("/", (req, res) => {
  res.send("Hello From Inventory Car Server");
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/user", allRouter);
app.use(notFound);
app.use(handleError);

module.exports = app;