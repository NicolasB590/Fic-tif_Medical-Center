import express from "express";
const router = express.Router();
import validate from "../../middlewares/validation.middleware.js";
import { LoginUserSchema, RegisterUserSchema } from "../users/users.schema.js";
import { RegisterDoctorSchema } from "../doctors/doctors.schema.js";
import * as authController from "./auth.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js";

//* Patients
router.post(
	"/register/patient",
	validate(RegisterUserSchema),
	authController.registerPatient
);

//* Doctors
router.post(
	"/register/doctor",
	validate(RegisterDoctorSchema),
	authController.registerDoctor
);

router.post("/login", validate(LoginUserSchema), authController.login);

router.get("/isLogged", authenticateUser, authController.isLogged);

export default router;
