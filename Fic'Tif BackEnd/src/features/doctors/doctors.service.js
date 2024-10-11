import Doctor from "./doctors.model.js";

const get = (options) => {
	return Doctor.findOne(options);
};

const create = (data) => {
	return Doctor(data).save();
};

export { get, create };
