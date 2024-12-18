import { z } from "zod";
import mongoose from "mongoose";

const isValidId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
};

const AppointmentSchema = z.object({
	date: z.coerce.date().refine((date) => date > new Date(), {
		message: "La date ne doit pas être antérieure à la date actuelle",
	}),
	doctorId: z.string().refine((id) => isValidId(id), {
		message: "L'identifiant est invalide",
	}),
	patientId: z.string().refine((id) => isValidId(id), {
		message: "L'identifiant est invalide",
	}),
	status: z.enum(["pending", "canceled", "done"]).default("pending", {
		required_error: "Le statut est requis",
	}),
});

export { AppointmentSchema };
