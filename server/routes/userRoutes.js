const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    // .delete(userController.deleteUser);
router.get("/:id", userController.getUserById);
router.route("/login").post(userController.loginUser);

module.exports = router;
