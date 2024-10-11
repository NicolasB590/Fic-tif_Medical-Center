import Doctor from "./doctors.model.js";

const get = (id) => {
	return Doctor.findById(id);
};

const create = (data) => {
	return Doctor(data).save();
};

export { get, create };
