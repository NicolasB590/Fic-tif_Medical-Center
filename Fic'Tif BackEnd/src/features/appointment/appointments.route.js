import express from "express";
const router = express.Router();
import validate from "../../middlewares/validation.middleware.js";
import { AppointmentSchema } from "./appointments.schema.js";
import * as appointmentController from "./appointments.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js";

//* Appointment
router.post("/", validate(AppointmentSchema), appointmentController.register);

// ! GetAll à faire

router.get("/", appointmentController.get);
router.put("/:id", appointmentController.update);
router.delete("/:id", appointmentController.remove);
router.post("/user", authenticateUser, appointmentController.getAllById);
router.post("/doctors", appointmentController.getAllByDoctorId);

export default router;
