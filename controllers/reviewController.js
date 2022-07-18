import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";

const createReview = async (req, res) => {
  const { id } = req.body;

  const isValidProduct = await Product.findOne({ _id: id });

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${id}. Please try again.`);
  }

  const alreadyReviewed = await Review.findOne({
    product: id,
    user: req.user.userId,
  });

  if (alreadyReviewed) {
    throw new BadRequestError(
      "You have already submitted a review for this product. You can update it on your account page."
    );
  }

  req.body.user = req.user.userId;
  req.body.product = id;
  await Review.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Your review has been posted! Thanks for your thoughts!" });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(
      `No review with id: ${reviewId}. Please try again.`
    );
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Your review has been updated! Thanks for your thoughts!" });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(
      `No review with id: ${reviewId}. Please try again.`
    );
  }
  checkPermissions(req.user, review.user);
  await review.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Your review has been removed. Feel free to post again!" });
};

const getSingleUserReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.userId }).populate({
    path: "product",
    select: "slug color category imgPath",
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export { createReview, updateReview, deleteReview, getSingleUserReviews };
