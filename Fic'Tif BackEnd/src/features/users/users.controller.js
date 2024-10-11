import * as userService from "./users.service.js";
import * as doctorService from "../doctors/doctors.service.js";
import * as patientService from "../patients/patients.service.js";
import { StatusCodes } from "http-status-codes";

// Récupérer la liste des utilisateurs
const getAll = async (_req, res) => {
	const users = await userService.getAll();
	res.status(StatusCodes.OK).json({ users });
};

// Récupère un utilisateur
const get = async (req, res) => {
	const { userId } = req.params;

	const user = await userService.get(userId);

	let userInfo = user;

	if (user.role === "doctor") {
		const doctorInfo = await doctorService.get(userId);
		if (doctorInfo) {
			userInfo = { ...user._doc, doctorInfo };
		}
	} else if (user.role === "patient") {
		console.log(user.role);
		const patientInfo = await patientService.get(userId);
		if (patientInfo) {
			userInfo = { ...user._doc, patientInfo };
		}
	}
	res.status(StatusCodes.OK).json({ user: userInfo });
};

// Met à jour un utilisateur
const update = async (req, res) => {
	const { userId } = req.params;
	const updatedUser = await userService.update(userId, req.body, {
		new: true,
	});
	if (!updatedUser) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Utilisateur non trouvé" });
	}
	res.status(StatusCodes.OK).json({ updatedUser });
};

// Supprime un utilisateur
const remove = async (req, res) => {
	const { userId } = req.params;
	const deletedUser = await userService.remove(userId);
	if (!deletedUser) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Utilisateur non trouvé" });
	}
	res
		.status(StatusCodes.OK)
		.json({ deletedUser, message: "Utilisateur supprimé avec succès" });
};

export { get, getAll, update, remove };
