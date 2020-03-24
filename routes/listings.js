var express = require("express");
var router = express.Router();
const { listingController } = require("../controllers");
const { verifyUser } = require("../authenticate");

router.get("/", listingController.index);
router.get("/getUserListings", verifyUser, listingController.getUserListings);
router.post("/", verifyUser, listingController.create);
router.delete("/:id", verifyUser, listingController.delete);

module.exports = router;
