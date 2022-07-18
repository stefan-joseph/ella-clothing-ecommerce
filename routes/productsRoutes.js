import express from "express";
const router = express.Router();

import {
  getSingleProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/productController.js";

router.route("/").get(getAllProducts);
router.route("/featured").get(getFeaturedProducts);
router.route("/:slug").get(getSingleProduct);

export default router;
