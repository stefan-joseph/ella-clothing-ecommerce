import User from "../models/User.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";

const addToUserCart = async (req, res) => {
  const { id: productId } = req.params;
  const { quantity, size } = req.body;
  if (!productId || !quantity || !size) {
    throw new BadRequestError("Please provide all necessary values");
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(
      `No product exists in the store with id: ${productId}`
    );
  }

  const user = await User.findOne({ _id: req.user.userId });

  const productAlreadyExistsInCart = user.shoppingCart.find(
    (item) => item.productId === productId && item.size === size
  );

  let shoppingCart;

  if (productAlreadyExistsInCart) {
    shoppingCart = user.shoppingCart.map((item) => {
      if (item.productId === productId && item.size === size) {
        return {
          ...item,
          quantity: item.quantity + quantity,
          color: item.color.name,
        };
      }
      return item;
    });
  }

  if (!productAlreadyExistsInCart) {
    shoppingCart = [
      ...user.shoppingCart,
      {
        productId,
        title: product.title,
        color: product.color,
        price: product.price,
        salePrice: product.salePrice,
        imgPath: product.imgPath,
        slug: product.slug,
        category: product.category,
        size,
        quantity,
      },
    ];
  }
  // should be user.save() to run moedl validators for shopping cart??
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { shoppingCart },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ shoppingCart: updatedUser.shoppingCart });
};

const updateUserCart = async (req, res) => {
  const { id: productId } = req.params;
  const { quantity, size } = req.body;

  if (!productId || !quantity || !size) {
    throw new BadRequestError("Please provide all necessary values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const productToUpdateInCart = user.shoppingCart.find(
    (item) => item.productId === productId && item.size === size
  );

  if (!productToUpdateInCart) {
    throw new NotFoundError(
      `Item cannot be updated. No product with id: ${productId} in size ${size} exists in your cart`
    );
  }

  const shoppingCart = user.shoppingCart.map((item) => {
    if (item.productId === productId && item.size === size) {
      return { ...item, quantity: quantity };
    }
    return item;
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { shoppingCart },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ shoppingCart: updatedUser.shoppingCart });
};

const deleteFromUserCart = async (req, res) => {
  const { id: productId } = req.params;
  const { size } = req.query;
  const user = await User.findOne({ _id: req.user.userId });

  if (!productId || !size) {
    throw new BadRequestError("Please provide all necessary values");
  }

  const productToDeleteInCart = user.shoppingCart.find(
    (item) => item.productId === productId && item.size === size
  );
  if (!productToDeleteInCart) {
    throw new NotFoundError(`No such product exists in the shopping cart`);
  }

  const shoppingCart = user.shoppingCart.filter((item) => {
    if (item.productId === productId && item.size === size) return;
    return item;
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { shoppingCart },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ shoppingCart: updatedUser.shoppingCart });
};

export { addToUserCart, updateUserCart, deleteFromUserCart };
