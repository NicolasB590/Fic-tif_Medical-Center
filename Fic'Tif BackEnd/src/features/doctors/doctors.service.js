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
	const doctors = await Doctor.find({ speciality }).populate("user");
	return;
};

const getAllByOptions = async (options) => {
	let query = {};

	if (options) {
		if (options.speciality) {
			query.speciality = options.speciality;
		}
	}

	const doctors = await Doctor.find(query).select("-_id");

	return doctors;
};

export { get, create, update, getSpecialities, getAllByOptions };
