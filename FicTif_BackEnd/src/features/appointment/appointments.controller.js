import * as appointmentService from "./appointments.service.js";
import * as usersService from "../users/users.service.js";
import * as doctorService from "../doctors/doctors.service.js";
import * as patientService from "../patients/patients.service.js";
import { StatusCodes } from "http-status-codes";

// Créé un Rendez-vous
const register = async (req, res) => {
	const doctor = await doctorService.get(req.body.doctorId);

	if (!doctor) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Aucun docteur correspondant" });
	}

	const patient = await patientService.get(req.body.patientId);

	if (!patient) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Aucun patient correspondant" });
	}

	// ! Ajouter la vérification de Rendez-vous déjà existant pour ce doctor sur ce créneau

	const appointment = await appointmentService.create({ ...req.body });
	res
		.status(StatusCodes.CREATED)
		.json({ appointment, msg: "Rendez-vous confirmé" });
};

// Récupére la liste des Rendez-vous
// ! Disponible que pour les admins/Directeur de centre
// ! A réaliser
const getAll = async (_req, res) => {
	const appointments = await appointmentService.getAll();
	res.status(StatusCodes.OK).json({ appointments });
};

// Récupère un Rendez-vous
const get = async (req, res) => {
	const date = req.body.date;
	const doctor = req.body.doctorId;

	const appointment = await appointmentService.get(doctor, date);

	if (!appointment) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Pas de rendez-vous correspondant trouvé" });
	}
	res.status(StatusCodes.OK).json({ appointment });
};

// Met à jour un Rendez-vous
const update = async (req, res) => {
	const id = req.params;

	const updatedAppointment = await appointmentService.update(id.id, req.body);
	if (!updatedAppointment) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Rendez-vous non trouvé" });
	}

	res.status(StatusCodes.OK).json({ updatedAppointment });
};

// Supprime un Rendez-vous
const remove = async (req, res) => {
	const id = req.params;
	const deletedAppointment = await appointmentService.remove(id.id);
	if (!deletedAppointment) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Rendez-vous non trouvé" });
	}
	res
		.status(StatusCodes.OK)
		.json({ deletedAppointment, msg: "Rendez-vous supprimé avec succès" });
};

// Récupère la liste des rendez-vous assignés à un utilisateur
const getAllById = async (req, res) => {
	const id = req.user.id;
	console.log(id);

	if (!id) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Pas d'utilisateur renseigné" });
	}

	const user = await usersService.getById(id);

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Utilisateur inexistant" });
	}

	const role = user.role;
	let speUser = "";
	let appointments = "";

	if (role === "patient") {
		speUser = await patientService.get(id);

		if (!Array.isArray(speUser) || speUser.length === 0 || !speUser[0]._id) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Patient introuvable" });
		}

		appointments = await appointmentService.getAllByPatientId(speUser[0].user);
	} else if (role === "doctor") {
		speUser = await doctorService.getByUserId(id);

		if (!Array.isArray(speUser) || speUser.length === 0 || !speUser[0]._id) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Médecin introuvable" });
		}

		appointments = await appointmentService.getAllByDoctorId(speUser[0]._id);
	} else {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Format de l'utilisateur invalide" });
	}

	if (!appointments || appointments === "") {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Aucun rendez-vous n'a été trouvé" });
	}
	res.status(StatusCodes.OK).json({ appointments });
};

// Récupère la liste des rendez-vous assignés à un médecin
const getAllByDoctorId = async (req, res) => {
	console.log(req.body.doctorId);

	const doctorId = req.body.doctorId;

	const appointments = await appointmentService.getAllByDoctorId(doctorId);

	if (!appointments) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Aucun rendez-vous n'a été trouvé" });
	}
	res.status(StatusCodes.OK).json({ appointments });
};

export { get, getAll, update, remove, register, getAllById, getAllByDoctorId };
