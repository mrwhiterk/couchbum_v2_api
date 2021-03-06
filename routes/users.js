var express = require('express');
var router = express.Router();
const { userController } = require('../controllers');
const { verifyUser } = require('../authenticate');
const passport = require('passport');

router.get("/", verifyUser, userController.index);
router.get("/getUser/:id", verifyUser, userController.show);
router.get("/travelers", userController.getTravelers);
router.post("/register", userController.register);
router.put('/:id', verifyUser, userController.put);
router.put('/addSkill/:id', verifyUser, userController.addSkill );
router.put('/removeSkill/:id', verifyUser, userController.removeSkill );
router.post("/login", passport.authenticate("local"), userController.login);
router.delete("/deleteUser", verifyUser, userController.deleteUser);

module.exports = router;
