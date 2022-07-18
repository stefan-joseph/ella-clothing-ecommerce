import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/authentication.js";

import {
  createReview,
  updateReview,
  deleteReview,
  getSingleUserReviews,
} from "../controllers/reviewController.js";

router.route("/").post(authenticateUser, createReview);

router.route("/user").get(authenticateUser, getSingleUserReviews);

router
  .route("/:id")
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
