const cartModel = require("../Model/cartModel");

async function addtocartController(req, res) {
  const { user, products, quantity, price } = req.body;

  try {
    const cart = await cartModel.create({ user, products, quantity, price });
    return res
      .status(201)
      .send({ success: true, message: "add to cart successfully", data: cart });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}
async function getsingleussercart(req, res) {
  const { userid } = req.params;
  try {
    const cart = await cartModel.find({ user: userid }).populate("products");
    return res
      .status(200)
      .send({ success: true, message: "get cart successfully", data: cart });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { addtocartController, getsingleussercart };
