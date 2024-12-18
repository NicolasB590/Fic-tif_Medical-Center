import "express-async-errors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.config.js";
import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(helmet());

app.set("trust proxy", 1);

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes).
		standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	})
);

app.use(mongoSanitize());

app.use(cors());

connectDB();

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

import { auth } from "./features/auth/index.js";
app.use("/api/v1/auth", auth);

import { users } from "./features/users/index.js";
app.use("/api/v1/users", users);

import { appointment } from "./features/appointment/index.js";
app.use("/api/v1/appointments", appointment);

import { doctors } from "./features/doctors/index.js";
app.use("/api/v1/doctors", doctors);

app.use(notFound);

app.use(errorHandler);

export default app;
