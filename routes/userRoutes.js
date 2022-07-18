import express from "express";
const router = express.Router();
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

import { updateUserAddress } from "../controllers/addressController.js";

import cartRouter from "./cartRouter.js";

router.use("/cart", cartRouter);

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

// router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/updateUserAddress").patch(authenticateUser, updateUserAddress);
router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
