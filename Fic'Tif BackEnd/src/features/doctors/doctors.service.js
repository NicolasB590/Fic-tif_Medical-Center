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

export { get, create, update };
