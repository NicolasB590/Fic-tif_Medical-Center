import * as doctorService from "./doctors.service.js";
import { StatusCodes } from "http-status-codes";

// Récupère les spécialités de tous les médecins
const getAllSpecialities = async (_req, res) => {
	const specialities = await doctorService.getSpecialities();
	res.status(StatusCodes.OK).json({ specialities });
};

// Récupère une liste de médecins selon des critères, tous les médecins si aucun critère
const getAllByOptions = async (req, res) => {
	const doctors = await doctorService.getAllByOptions(req.query);
	res.status(StatusCodes.OK).json({ doctors });
};

// Récupère une liste de médecins triée selon la spécialité renseignée
const getDoctorsBySpeciality = async (req, res) => {
	const doctors = await doctorService.getDoctorsBySpeciality(
		req.body.speciality
	);
	res.status(StatusCodes.OK).json({ doctors });
};

export { getAllSpecialities, getAllByOptions, getDoctorsBySpeciality };
