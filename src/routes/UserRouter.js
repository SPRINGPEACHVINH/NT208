const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/sign-up", userController.CreateUser);
router.post("/sign-in", userController.LoginUser);
router.post("/google-sign-in", userController.GoogleSignIn);
router.put("/update-user/:id", userController.UpdateUser);
router.delete("/delete-user/:id", userController.DeleteUser);
router.get("/getAll", userController.GetAllUser);
router.get("/get-details/:UserName", userController.GetDetailsUser);
router.get("/get-id/:UserName", userController.GetIdUser);
router.get("/get-events/:UserName", userController.GetEvents);
router.post("/refresh-token", userController.RefreshToken);
router.post("/forgot-password", userController.ForgotPassword);

module.exports = router;
