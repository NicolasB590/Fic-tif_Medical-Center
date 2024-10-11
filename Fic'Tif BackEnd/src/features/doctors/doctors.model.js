import mongoose, { model, Schema } from "mongoose";
import User from "../users/users.model.js";

const DoctorSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: [true, "Veuillez fournir un utilisateur associé"],
	},
	speciality: {
		type: String,
		enum: [
			"Neurology",
			"Diagnostic",
			"Hospital Director",
			"Oncology",
			"Surgery",
			"Immunology",
		],
		required: [true, "Veuillez fournir une spécialité"],
	},
});

export default model("Doctor", DoctorSchema);
