const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController.cjs");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth.cjs");

router.route("/payment/process").post(processPayment);

router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
