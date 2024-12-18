import mongoose, { model, Schema } from "mongoose";
import User from "../users/users.model.js";

const PatientSchema = new Schema({
	user: {
		type: mongoose.ObjectId,
		ref: User,
	},
});

export default model("Patient", PatientSchema);
