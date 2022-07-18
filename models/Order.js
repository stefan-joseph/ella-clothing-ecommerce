import mongoose from "mongoose";
import validator from "validator";

const SingleOrderItemSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: Object, required: true },
  imgPath: { type: Array, required: true },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: [
        "pending - awaiting payment",
        "paid - awaiting shipment",
        "shipped - awaiting delivery",
        "delivered",
        "canceled",
      ],
      default: "pending - awaiting payment",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: validator.isEmail,
          message: "Please provide a valid email",
        },
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        enum: ["USA"],
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      tel: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
