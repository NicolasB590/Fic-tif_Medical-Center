import { StatusCodes } from "http-status-codes";
import * as usersService from "../users/users.service.js";
import * as patientService from "../patients/patients.service.js";
import * as doctorsService from "../doctors/doctors.service.js";
import { UnauthenticatedError } from "../../errors/index.js";
import User from "../users/users.model.js";

const registerPatient = async (req, res) => {
	const role = "patient";
	const user = await usersService.create({ ...req.body, role });
	const userId = user._id;
	const patient = await patientService.create(userId);
	const token = user.createAccessToken();
	res.status(StatusCodes.CREATED).json({ user, token });
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
	console.log(req.body);
	console.log(req.body.email);
	console.log(req.body.password);

	const user = await usersService.get({ email: req.body.email });
	if (!user) {
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	console.log(user);

	const isPasswordCorrect = await user.comparePasswords(req.body.password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	const token = user.createAccessToken();
	res.status(StatusCodes.OK).json({ user: { userId: user._id, token } });
};

export { login, registerPatient, registerDoctor };
