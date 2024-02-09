const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Route imports
const userRoute = require("./routes/userRoutes.cjs");
const errorMiddleware = require("./middleware/error.cjs");

app.use("/api/v1", userRoute);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
