import * as UserService from "../features/users/users.service.js";
import { StatusCodes } from "http-status-codes";
import validate from "../middlewares/validation.middleware.js";
import { RegisterDoctorSchema } from "../features/doctors/doctors.schema.js";
import { RegisterUserSchema } from "../features/users/users.schema.js";

const getRole = async (id) => {
	user = await UserService.get(id);

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "L'utilisateur n'existe pas'" });
	}

	if (user.role === "doctor") {
		return validate(RegisterDoctorSchema);
	} else if (user.role === "patient") {
		return validate(RegisterUserSchema);
	} else {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Format de l'utilisateur invalide" });
	}
};
