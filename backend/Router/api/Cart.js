const express = require("express");
const {
  addtocartController,
  getsingleussercart,
  incrementcartController,
  decrementcartController,
} = require("../../Controllers/cartController");
const router = express.Router();

router.post("/addtocart", addtocartController);
router.get("/getcart/:userid", getsingleussercart);
router.patch("/incrementcart/:id", incrementcartController);
router.patch("/decrementcart/:id", decrementcartController);

module.exports = router;
