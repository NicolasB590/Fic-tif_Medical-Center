import Doctor from "./doctors.model.js";
import User from "../users/users.model.js";

const get = (id) => {
	return Doctor.findById(id);
};

const update = (userId, change) => {
	return Doctor.findOneAndUpdate({ user: userId }, change);
};

const create = (data) => {
	return Doctor(data).save();
};

const getSpecialities = async () => {
	const specialities = await Doctor.find({}, "speciality");
	const uniqueSpecialities = [
		...new Set(specialities.map((doctor) => doctor.speciality)),
	];
	return uniqueSpecialities;
};

const getDoctorsBySpeciality = async (speciality) => {
	const doctors = await Doctor.find({ speciality }).populate({
		path: "user",
		select: "-birthDate -adress -role",
	});
	return doctors;
};

const getAllByOptions = async (options) => {
	let query = {};

	if (options) {
		if (options.speciality) {
			query.speciality = options.speciality;
		}
		if (options._id) {
			query._id = options._id;
		}
		if (options.user) {
			query.user = options.user;
		}
	}

	const doctors = await Doctor.find(query).select("-_id").populate({
		path: "user",
		select: "-_id -birthDate -adress -role",
	});

	return doctors;
};

const searchDoctors = async (searchTerm) => {
	// Recherche des utilisateurs avec le rôle "doctor"
	const searchResult = await User.find({
		$and: [
			{
				$or: [
					{ firstName: { $regex: searchTerm, $options: "i" } },
					{ lastName: { $regex: searchTerm, $options: "i" } },
				],
			},
			{ role: "doctor" },
		],
	})
		.select("firstName lastName role _id") // Sélectionner l'ID de l'utilisateur et les autres champs nécessaires
		.populate({
			path: "doctor", // Le champ `doctor` doit être ajouté pour récupérer les informations du médecin
			model: "Doctor", // On précise le modèle à peupler
			select: "speciality", // Sélectionner uniquement la spécialité du médecin
		});

	console.log(searchResult);

	// Maintenant, chaque utilisateur dans searchResult aura une propriété doctorId avec la spécialité
	return searchResult.map((user) => ({
		...user.toObject(), // Convertir l'objet Mongoose en objet JavaScript simple
		speciality: user.doctor ? user.doctor.speciality : null, // Ajouter la spécialité au résultat
	}));
};

export {
	get,
	create,
	update,
	getSpecialities,
	getAllByOptions,
	getDoctorsBySpeciality,
	searchDoctors,
};
