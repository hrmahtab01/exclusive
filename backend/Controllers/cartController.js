const cartModel = require("../Model/cartModel");
const productModel = require("../Model/productModel");

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

async function incrementcartController(req, res) {
  const { id } = req.params;

  try {
    const cart = await cartModel.findOne({ _id: id });

    if (!cart) {
      return res
        .status(404)
        .send({ success: false, nessage: "cart not found" });
    }
    const product = await productModel.findOne({ _id: cart.products });

    if (product.stock > cart.quantity) {
      cart.quantity++;
    } else {
      return res.status(400).send({
        success: false,
        message: "product out of stock",
      });
    }
    await cart.save();

    return res.status(200).send({
      success: true,
      message: "cart quantity increased successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function decrementcartController(req, res) {
  const { id } = req.params;
  try {
    const decrementcart = await cartModel.findOne({ _id: id });
    if (!decrementcart) {
      return res
        .status(404)
        .send({ success: false, message: "cart not found" });
    }
    if (decrementcart.quantity > 1) {
      decrementcart.quantity--;
    }
    await decrementcart.save();
    return res.status(200).send({
      success: true,
      message: "cart quantity decreased successfully",
      data: decrementcart,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}
module.exports = {
  addtocartController,
  getsingleussercart,
  incrementcartController,
  decrementcartController,
};
