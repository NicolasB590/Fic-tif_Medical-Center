import * as doctorService from "./doctors.service.js";
import { StatusCodes } from "http-status-codes";

// Récupère les spécialités de tous les médecins
const getAllSpecialities = async (_req, res) => {
	const specialities = await doctorService.getSpecialities();
	res.status(StatusCodes.OK).json({ specialities });
};

// Récupère une liste de médecins selon des critères, tous les médecins si aucun critère
const getAllByOptions = async (req, res) => {
	console.log(req.body);

	const doctors = await doctorService.getAllByOptions(req.body);
	res.status(StatusCodes.OK).json({ doctors });
};

// Récupère une liste de médecins triée selon la spécialité renseignée
const getDoctorsBySpeciality = async (req, res) => {
	const doctors = await doctorService.getDoctorsBySpeciality(
		req.body.speciality
	);
	res.status(StatusCodes.OK).json({ doctors });
};

const searchDoctors = async (req, res) => {
	const searchTerm = req.body.searchTerm;

	if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Le terme de recherche doit être une chaîne valide." });
	}

	const searchResult = await doctorService.searchDoctors(searchTerm);

	if (!searchResult) {
		res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Erreur lors de la recherche des médecins" });
	}

	res.status(StatusCodes.OK).json({ searchResult });
};

const getAllInformations = async (req, res) => {
	const doctor = await doctorService.getAllInformations(req.body);
	res.status(StatusCodes.OK).json({ doctor });
};

export {
	getAllSpecialities,
	getAllByOptions,
	getDoctorsBySpeciality,
	searchDoctors,
	getAllInformations,
};
