import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

//express
import express from "express";
const app = express();

//rest of packages
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
// import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//database
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//webhook function
import { handleWebhook } from "./controllers/webhookController.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
app.use(helmet());
// app.use(xss());
app.use(mongoSanitize());

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

app.post("/webhook", handleWebhook);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
