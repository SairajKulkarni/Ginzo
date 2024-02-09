const ErrorHandler = require("../utils/errorHandler.cjs");
const catchAsyncErrors = require("./catchAsyncErrors.cjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.cjs");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);

  next();
});

// To ensure that admin is acessing
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // here we will passing "admin" as the parameter to the function and then in the if condition we are checking req.user.role if it is not equal to admin the we tell them that their role is not authorized to access the specific resource
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:  ${req.user.role}, is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
