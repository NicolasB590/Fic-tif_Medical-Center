import express from "express";
const router = express.Router();
import * as doctorController from "./doctors.controller.js";

//* Doctor
router.get("/specialities", doctorController.getAllSpecialities);
router.get("/options", doctorController.getAllByOptions);
router.post("/bySpeciality", doctorController.getDoctorsBySpeciality);
router.post("/search", doctorController.searchDoctors);

export default router;
