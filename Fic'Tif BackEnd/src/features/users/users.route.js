import express from "express";
const router = express.Router();
import * as usersController from "./users.controller.js";

router.get("/", usersController.getAll);
router.get("/:id", usersController.get);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;
