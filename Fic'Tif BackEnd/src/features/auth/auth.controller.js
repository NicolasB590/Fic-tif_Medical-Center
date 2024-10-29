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

	const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});

	const oneDay = 24 * 60 * 60 * 1000;
	const oneWeek = 7 * 24 * 60 * 60 * 1000;

	res.cookie("accessToken", token, {
		HttpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
		expires: new Date(Date.now() + oneDay),
	});

	res.status(StatusCodes.OK).json({ user: { userId: id } });
};

export { login, registerPatient, registerDoctor };
