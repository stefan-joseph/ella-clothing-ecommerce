import express from "express";
const router = express.Router();

import {
  addToUserCart,
  updateUserCart,
  deleteFromUserCart,
} from "../controllers/cartController.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

router
  .route("/:id")
  .post(authenticateUser, addToUserCart)
  .patch(authenticateUser, updateUserCart)
  .delete(authenticateUser, deleteFromUserCart);

export default router;
