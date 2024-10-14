import "express-async-errors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.config.js";
import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.middleware.js";

const app = express();

connectDB();

app.use(express.json());

import { auth } from "./features/auth/index.js";
app.use("/api/v1/auth", auth);

import { users } from "./features/users/index.js";
app.use("/api/v1/users", users);

import { appointment } from "./features/appointment/index.js";
app.use("/api/v1/appointments", appointment);

app.use(notFound);

app.use(errorHandler);

export default app;
