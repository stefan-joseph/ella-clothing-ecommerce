// import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { NotFoundError } from "../errors/index.js";

const getSingleProduct = async (req, res) => {
  const { color } = req.query;
  const { slug } = req.params;
  const products = await Product.find({ slug });

  const availableColors = products.map((item) => item.color);

  const singleProductData = await Product.findOne({
    slug,
    "color.name": color,
  }).populate({
    path: "reviews",
    populate: {
      path: "user",
      select: "firstName",
    },
  });

  if (!singleProductData) {
    throw new NotFoundError(
      `No product with name: ${slug.replace("-", " ")} and color: ${color}`
    );
  }

  res.status(StatusCodes.OK).json({ singleProductData, availableColors });
};

const getAllProducts = async (req, res) => {
  const { category, color, size, collection, sort, featured } = req.query;

  let queryObject = {};

  // add stuff based on condition
  if (color && color !== "all")
    queryObject = {
      ...queryObject,
      "color.name": { $regex: color, $options: "i" },
    };

  if (size && size !== "all")
    queryObject = {
      ...queryObject,
      inventory: { $elemMatch: { size: size, quantity: { $gt: 0 } } },
    };

  if (category && category !== "all") queryObject.category = category;

  if (collection && collection !== "all") queryObject.inCollection = collection;

  if (featured && featured !== "false") queryObject.featured = featured;

  // NO AWAIT
  let result = Product.find(queryObject);

  //chain sort conditions

  if (sort === "Price - Low to High") {
    result = result.sort("price");
  }
  if (sort === "Price - High to Low") {
    result = result.sort("-price");
  }

  // add pagination when there are more products

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  let colors;
  if (category === "all") {
    colors = await Product.find({}).distinct("color.name");
  } else {
    colors = await Product.find({ category }).distinct("color.name");
  }
  colors = colors.map((color) => {
    if (color.split(" ").length > 1) {
      return color.split(" ")[1];
    }
    return color;
  });
  colors = [...new Set(colors)];

  let sizes;
  if (category === "all" || !category) {
    sizes = await Product.find({}).distinct("inventory.size");
  } else {
    sizes = await Product.find({ category }).distinct("inventory.size");
  }
  // sort sizes into seperate arrays and order properly for better usability
  const order = ["xs", "s", "m", "l", "xl", "os"];
  sizes = sizes.reduce(
    (array, size) => {
      if (isNaN(size)) {
        array[0] = [...array[0], size];
        array[0].sort((a, b) => order.indexOf(a) - order.indexOf(b));
        return [array[0], array[1]];
      } else {
        array[1] = [...array[1], size];
        array[1].sort((a, b) => a - b);
        return [array[0], array[1]];
      }
    },
    [[], []]
  );

  const collections = await Product.find({}).distinct("inCollection");

  const totalProducts = await Product.countDocuments(queryObject);
  let numOfPages = Math.ceil(totalProducts / limit);
  if (numOfPages === 0) numOfPages = 1;

  res.status(StatusCodes.OK).json({
    products,
    colors,
    sizes,
    collections,
    // count: products.length,
    numOfPages,
    totalProducts,
  });
};

const getFeaturedProducts = async (req, res) => {
  let featured = await Product.find({ featured: true });

  // sorts featured products by desired order
  const sort = ["dresses", "tops", "bottoms", "accessories"];
  featured.sort((a, b) => sort.indexOf(a.category) - sort.indexOf(b.category));

  // groups featured products based on 'category' property
  let featuredGrouped = Object.values(
    featured.reduce((acc, item) => {
      // Append the item to the array for each country
      acc[item.category] = [...(acc[item.category] || []), item];
      return acc;
    }, {})
  );

  // ensures each featured group only has two products - otherwise front-end will break
  featuredGrouped = featuredGrouped.map((g) => {
    if (g.length === 2) return g;
    else if (g.length === 1) {
      g.push(g[0]);
      return g;
    } else if (g.length > 2) {
      while (g.length > 2) {
        g.pop();
      }
      return g;
    }
  });

  res.status(StatusCodes.OK).json({
    featured: featuredGrouped,
  });
};

export { getSingleProduct, getAllProducts, getFeaturedProducts };
