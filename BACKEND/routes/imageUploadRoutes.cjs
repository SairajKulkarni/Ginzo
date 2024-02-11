const uploadMiddleware = require("../middleware/multer.cjs");
const express = require("express");
const imageController = require("../controllers/imageController.cjs");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Image upload route
router
  .route("/uploadImage")
  .post(
    uploadMiddleware.singleUpload,
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    imageController.uploadImage
  );

router
  .route("/getAllImages")
  .get(
    authMiddleware.isAuthenticatedUser,
    authMiddleware.authorizeRoles("admin"),
    imageController.getAllImages
  );

module.exports = router;
