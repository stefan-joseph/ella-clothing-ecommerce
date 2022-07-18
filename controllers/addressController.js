import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const updateUserAddress = async (req, res) => {
  const { street, city, state, country, zip, tel } = req.body;

  if (!street || !city || !state || !country || !zip || !tel) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const address = { street, city, state, country, zip, tel };

  await User.findOneAndUpdate({ _id: req.user.userId }, { address });

  res.status(StatusCodes.OK).json({ msg: "Success! Address updated." });
};

export { updateUserAddress };
