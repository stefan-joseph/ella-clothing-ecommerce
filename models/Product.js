import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["men", "women"],
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      //make required: true and default: null?
      type: Number,
    },
    color: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inCollection: {
      type: String,
      required: true,
      enum: ["summer", "winter"],
    },
    category: {
      type: String,
      required: true,
      enum: ["tops", "bottoms", "accessories", "dresses", "footwear"],
    },
    imgPath: [String],
    inventory: {
      type: [Object],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// to populate any asociated reviews with getSingleProduct
ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

// needs to be present if deleteProduct route is added for admin to delete associated reviews
ProductSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

export default mongoose.model("Product", ProductSchema);
