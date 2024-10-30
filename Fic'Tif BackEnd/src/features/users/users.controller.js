import * as userService from "./users.service.js";
import * as doctorService from "../doctors/doctors.service.js";
import * as patientService from "../patients/patients.service.js";
import { StatusCodes } from "http-status-codes";

// Récupère un utilisateur
const get = async (req, res) => {
	const id = req.params;

	const user = await userService.get(id.id);

	let userInfo = user;

	if (user.role === "doctor") {
		const doctorInfo = await doctorService.get(id.id);
		if (doctorInfo) {
			userInfo = { ...user._doc, doctorInfo };
		}
	} else if (user.role === "patient") {
		const patientInfo = await patientService.get(id.id);
		if (patientInfo) {
			userInfo = { ...user._doc, patientInfo };
		}
	}
	res.status(StatusCodes.OK).json({ user: userInfo });
};

// Récupère une liste d'utilisateurs selons des critères, tous les utilisateurs si aucun critère
const getAllByOptions = async (req, res) => {
	console.log(req.query);

	const users = await userService.getAllByOptions(req.query);
	res.status(StatusCodes.OK).json({ users });
};

// Met à jour un utilisateur
const update = async (req, res) => {
	const id = req.params;

	const updatedUser = await userService.update(id.id, req.body);
	if (!updatedUser) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Utilisateur non trouvé" });
	}

	let updatedInfo = updatedUser;

	if (updatedUser.role === "doctor") {
		const updatedDoctor = await doctorService.update(id.id, req.body);
		if (!updatedDoctor) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Informations du docteur non trouvées" });
		} else {
			updatedInfo = { ...updatedUser, updatedDoctor };
		}
	}
	res.status(StatusCodes.OK).json({ updatedInfo });
};

// Supprime un utilisateur
const remove = async (req, res) => {
	const id = req.params;
	const deletedUser = await userService.remove(id.id);
	if (!deletedUser) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Utilisateur non trouvé" });
	}
	res
		.status(StatusCodes.OK)
		.json({ deletedUser, msg: "Utilisateur supprimé avec succès" });
};

const isLogged = async (req, res) => {
	console.log(req.user.email);

	const email = req.user.email;

	const user = await userService.isLogged(email);

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Utilisateur non trouvé" });
	}
	res.status(StatusCodes.OK).json({ user, msg: "Utilisateur connecté" });
};

export { get, update, remove, getAllByOptions, isLogged };
