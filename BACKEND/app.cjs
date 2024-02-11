const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

// Route imports
const userRoute = require("./routes/userRoutes.cjs");
const imageRoute = require("./routes/ImageUploadRoutes.cjs");
const errorMiddleware = require("./middleware/error.cjs");

app.use("/api/v1", userRoute);
app.use("/api/v1", imageRoute);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
