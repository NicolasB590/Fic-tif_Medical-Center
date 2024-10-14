import express from "express";
const router = express.Router();
import validate from "../../middlewares/validation.middleware.js";
import { AppointmentSchema } from "./appointments.schema.js";
import * as appointmentController from "./appointments.controller.js";

//* Appointment
router.post("/", validate(AppointmentSchema), appointmentController.register);
router.get("/", appointmentController.get);
router.put("/:id", appointmentController.update);
router.delete("/:id", appointmentController.remove);

export default router;
