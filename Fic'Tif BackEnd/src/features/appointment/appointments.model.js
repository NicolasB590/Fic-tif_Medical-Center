import mongoose, { model, Schema } from "mongoose";

const AppointmentSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
			validate: {
				validator: (value) => value > new Date(),
				message: "La date doit être supérieure à la date et heure actuelles",
			},
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Doctor",
		},
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Patient",
		},
		status: {
			type: String,
			enum: ["pending", "canceled", "done"],
			default: "pending",
			required: true,
		},
	},
	{ timestamps: true }
);

export default model("Appointment", AppointmentSchema);
