import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Veuillez fournir un nom de famille"],
		maxlength: 50,
		minlength: 3,
	},
	lastName: {
		type: String,
		required: [true, "Veuillez fournir un prénom"],
		maxlength: 50,
		minlength: 3,
	},
	birthDate: {
		type: Date,
		required: [true, "Veuillez fournir une date de naissance"],
		validate: {
			validator: function (value) {
				return value < new Date();
			},
			message: "Veuillez fournir une date de naissance valide",
		},
	},
	email: {
		type: String,
		required: [true, "Veuillez fournir un email"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Veuillez fournir un email valide",
		],
	},
	password: {
		type: String,
		required: [true, "Veuillez fournir un mot de passe"],
		minlength: 6,
	},
	address: {
		type: String,
		required: [true, "Veuillez fournir une adresse"],
		minlength: 8,
		maxlength: 120,
	},
	phoneNumber: {
		type: String,
		required: [true, "Veuillez fournir un numéro de téléphone"],
		match: [/^0\d{9}$/, "Veuillez fournir un numéro de téléphone valide"],
	},
	role: {
		type: String,
		enum: ["patient", "doctor"],
		required: [true, "Impossible de déterminer le rôle de l'utilisateur"],
	},
	gender: {
		type: String,
		emun: ["man", "woman"],
		required: true,
	},
});

UserSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.toJSON = function () {
	let userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

UserSchema.methods.createAccessToken = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default model("User", UserSchema);
