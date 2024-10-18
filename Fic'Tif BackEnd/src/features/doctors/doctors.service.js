import Doctor from "./doctors.model.js";

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

export {
	get,
	create,
	update,
	getSpecialities,
	getAllByOptions,
	getDoctorsBySpeciality,
};
