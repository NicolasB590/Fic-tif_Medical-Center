import express from "express";
const router = express.Router();
import * as usersController from "./users.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import { RegisterUserSchema } from "./users.schema.js";
import { RegisterDoctorSchema } from "../doctors/doctors.schema.js";

// ! Il faut implémenter la validation de Schema pour le put

router.get("/", usersController.getAllByOptions);
router.get("/:id", usersController.get);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;
