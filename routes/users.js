var express = require('express');
var router = express.Router();
const { userController } = require('../controllers');
const { verifyUser } = require('../authenticate');
const passport = require('passport');

router.get("/", verifyUser, userController.index);
router.get("/getUser", verifyUser, userController.show);
router.post("/register", userController.register);
router.post("/login", passport.authenticate("local"), userController.login);
router.delete("/deleteUser", verifyUser, userController.deleteUser);

module.exports = router;