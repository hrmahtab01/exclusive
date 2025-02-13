const express = require("express");
const { addtocartController, getsingleussercart } = require("../../Controllers/cartController");
const router = express.Router();

router.post("/addtocart", addtocartController);
router.get("/getcart/:userid", getsingleussercart);

module.exports = router;
