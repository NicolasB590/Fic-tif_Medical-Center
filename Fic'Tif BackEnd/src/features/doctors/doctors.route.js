import express from "express";
const router = express.Router();
import * as doctorController from "./doctors.controller.js";

//* Doctor
router.get("/specialities", doctorController.getAllSpecialities);
router.get("/options", doctorController.getAllByOptions);
router.get("/bySpecialities", doctorController.getAllByOptions);

export default router;
