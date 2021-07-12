const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/", userController.view);
router.post("/", userController.find);
router.get("/adduser", userController.newUser);
router.post("/adduser", userController.addUser);
router.get("/edit/:id", userController.edit);
router.post("/edituser/:id", userController.editUser);
router.get("/delete/:id", userController.delete);
router.get("/viewuser/:id", userController.details);

module.exports = router;
