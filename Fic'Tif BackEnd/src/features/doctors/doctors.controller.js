import * as doctorService from "./doctors.service.js";
import { StatusCodes } from "http-status-codes";

// Récupère les spécialités de tous les médecins
const getAllSpecialities = async (_req, res) => {
	const specialities = await doctorService.getSpecialities();
	res.status(StatusCodes.OK).json({ specialities });
};

// Récupère une liste de médecins selons des critères, tous les médecins si aucun critère
const getAllByOptions = async (req, res) => {
	const doctors = await doctorService.getAllByOptions(req.query);
	res.status(StatusCodes.OK).json({ doctors });
};

const getDoctorsBySpeciality = async (req, res) => {
	const doctors = await doctorService.getDoctorsBySpeciality(req.body);
	res.status(StatusCodes.OK).json({ doctors });
};

export { getAllSpecialities, getAllByOptions, getDoctorsBySpeciality };
