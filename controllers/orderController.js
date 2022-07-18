import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { shippingRates } from "../utils/ShippingRates.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

// const fakeStripeAPI = async ({ amount, currency }) => {
//   const client_secret = "someRandomValue";
//   return { client_secret, amount };
// };

const createOrder = async (req, res) => {
  const { shoppingCart, shippingInfo } = req.body;

  const { firstName, lastName, email, street, city, state, country, zip, tel } =
    shippingInfo;

  if (!shoppingCart || shoppingCart.length < 1) {
    throw new BadRequestError("No shopping cart items provided");
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !street ||
    !city ||
    !state ||
    !country ||
    !zip ||
    !tel
  ) {
    throw new BadRequestError("Please provide all shipping information");
  }

  let orderItems = [];
  let subtotal = 0;
  const taxRate = 0.15;
  const shippingFee = shippingRates[`${country}`][`${state}`] * 100;

  for (const item of shoppingCart) {
    const dbProduct = await Product.findOne({ _id: item.productId });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.productId}`);
    }
    const { title, price, salePrice, color, imgPath, _id } = dbProduct;
    const singleOrderItem = {
      title,
      price: salePrice || price,
      quantity: item.quantity,
      size: item.size,
      color: color,
      imgPath: imgPath,
      productId: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.quantity * price * 100;
  }

  //calculate tax
  const tax = subtotal * taxRate;

  // calculate total
  const total = subtotal + tax + shippingFee;

  // get client secret
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  let order;

  if (req.user) {
    order = await Order.create({
      orderItems,
      total: paymentIntent.amount,
      subtotal,
      tax,
      shippingFee,
      shippingInfo,
      currency: paymentIntent.currency,
      paymentIntentId: paymentIntent.id,
      user: req.user.userId,
    });
  } else {
    order = await Order.create({
      orderItems,
      total: paymentIntent.amount,
      subtotal,
      tax,
      shippingFee,
      shippingInfo,
      paymentIntentId: paymentIntent.id,
    });
  }

  order.paymentIntentId = undefined;
  order.user = undefined;

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: paymentIntent.client_secret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  // get all user orders with successful payment
  const orders = await Order.find({
    user: req.user.userId,
    status: { $ne: "pending - awaiting payment" },
  });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
