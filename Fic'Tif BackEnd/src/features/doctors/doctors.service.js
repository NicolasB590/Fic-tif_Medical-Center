import Doctor from "./doctors.model.js";
import User from "../users/users.model.js";

const get = (id) => {
	return Doctor.findById(id);
};

const getAllInformations = ({ params }) => {
	const userId = params._id;

	console.log(userId);

	return Doctor.findOne({ user: userId }).select("-_id").populate({
		path: "user",
		select: "-_id -birthDate -role",
	});
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
		if (options.speciality && typeof options.speciality === "string") {
			query.speciality = options.speciality;
		}
		if (options._id && /^[a-fA-F0-9]{24}$/.test(options._id)) {
			query._id = options._id;
		}
		if (options.user && /^[a-fA-F0-9]{24}$/.test(options.user)) {
			query.user = options.user;
		}
	}

	const doctors = await Doctor.find(query).select("-_id").populate({
		path: "user",
		select: "-_id -birthDate -role",
	});

	return doctors;
};

const searchDoctors = async (searchTerm) => {
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
		.select("firstName lastName role _id")
		.populate({
			path: "doctor",
			model: "Doctor",
			select: "speciality",
		});

	console.log(searchResult);

	return searchResult.map((user) => ({
		...user.toObject(),
		speciality: user.doctor ? user.doctor.speciality : null,
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
	getAllInformations,
};
