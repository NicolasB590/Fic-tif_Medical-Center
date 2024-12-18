import express from "express";
const router = express.Router();
import * as doctorController from "./doctors.controller.js";

//* Doctor
router.get("/specialities", doctorController.getAllSpecialities);
router.post("/options", doctorController.getAllByOptions);
router.post("/getInformations", doctorController.getAllInformations);
router.post("/bySpeciality", doctorController.getDoctorsBySpeciality);
router.post("/search", doctorController.searchDoctors);

export default router;
