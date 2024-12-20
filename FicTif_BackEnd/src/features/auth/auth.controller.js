import { StatusCodes } from "http-status-codes";
import * as usersService from "../users/users.service.js";
import * as patientService from "../patients/patients.service.js";
import * as doctorsService from "../doctors/doctors.service.js";
import { UnauthenticatedError } from "../../errors/index.js";
import jwt from "jsonwebtoken";
import User from "../users/users.model.js";

const registerPatient = async (req, res) => {
	const role = "patient";
	const user = await usersService.create({ ...req.body, role });
	const userId = user._id;
	const patient = await patientService.create(userId);
	const token = user.createAccessToken();
	res
		.status(StatusCodes.CREATED)
		.json({ user, token, msg: "Compte créé avec succés !" });
};

const registerDoctor = async (req, res) => {
	const role = "doctor";
	console.log(`CONTROLLER : ${req.body}`);

	const user = await usersService.create({ ...req.body, role });

	const doctorData = { speciality: req.body.speciality, user: user.id };
	const doctor = await doctorsService.create(doctorData);
	const token = user.createAccessToken();
	res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
	const user = await usersService.get({ email: req.body.email });

	if (!user) {
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	const id = user._id;
	const email = user.email;

	const isPasswordCorrect = await user.comparePasswords(req.body.password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});

	const oneDay = 24 * 60 * 60 * 1000;

	res.cookie("accessToken", token, {
		HttpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
		expires: new Date(Date.now() + oneDay),
	});

	res.status(StatusCodes.OK).json({ user: { userId: id } });
};

const logout = async (req, res) => {
	res.clearCookie("accessToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});

	res.status(StatusCodes.OK).json({ msg: "Déconnexion réussie." });
};

const isLogged = async (req, res) => {
	const email = req.user.email;

	const user = await usersService.isLogged(email);

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Utilisateur non trouvé" });
	}
	res.status(StatusCodes.OK).json({ user, msg: "Utilisateur connecté" });
};

export { login, registerPatient, registerDoctor, isLogged, logout };
