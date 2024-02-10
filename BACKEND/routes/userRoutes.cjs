const express = require("express");
const userController = require("../controllers/userController.cjs");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/password/forgot", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.get("/logout", userController.logout);
router.get(
  "/me",
  authMiddleware.isAuthenticatedUser,
  userController.getUserDetails
);
router.put(
  "/password/update",
  authMiddleware.isAuthenticatedUser,
  userController.updatePassword
);
router.put(
  "/me/update",
  authMiddleware.isAuthenticatedUser,
  userController.updateUserProfile
);

// Admin Routes
router.get(
  "/admin/users",
  authMiddleware.isAuthenticatedUser,
  authMiddleware.authorizeRoles("admin"),
  userController.getAllUsers
);

router.post(
  "/adminPanel",
  userController.loginUser,
  authMiddleware.authorizeRoles("admin")
);

// Uncomment and modify as needed
// router
//   .route("/admin/user/:id")
//   .get(authMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), userController.getAnyUser)
//   .put(authMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), userController.updateUserRole)
//   .delete(authMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), userController.deleteUser);

module.exports = router;
