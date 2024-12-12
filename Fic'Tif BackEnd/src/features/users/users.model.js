import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Veuillez fournir un prénom"],
		maxlength: 50,
		minlength: 3,
	},
	lastName: {
		type: String,
		required: [true, "Veuillez fournir un nom de famille"],
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
		unique: true, // Assurer l'unicité de l'email
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
		enum: ["man", "woman"], // Correction ici : "enum" au lieu de "emun"
		required: true,
	},
	doctor: {
		type: Schema.Types.ObjectId,
		ref: "Doctor", // On référence le modèle 'Doctor'
	},
});

// Hachage du mot de passe avant la sauvegarde
UserSchema.pre("save", async function () {
	if (this.isModified("password")) {
		// On vérifie si le mot de passe a été modifié
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}
});

// Hachage du mot de passe avant la mise à jour
UserSchema.pre("findOneAndUpdate", async function () {
	if (this._update.password) {
		// On vérifie si le mot de passe a été mis à jour
		const salt = await bcrypt.genSalt();
		this._update.password = await bcrypt.hash(this._update.password, salt);
	}
});

// Méthode pour exclure le mot de passe lors de la conversion en JSON
UserSchema.methods.toJSON = function () {
	let userObject = this.toObject();
	delete userObject.password; // Exclure le mot de passe
	return userObject;
};

// Méthode pour créer un token d'accès JWT
UserSchema.methods.createAccessToken = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default model("User", UserSchema);
