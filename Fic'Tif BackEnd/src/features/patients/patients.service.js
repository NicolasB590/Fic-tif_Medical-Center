import Patient from "./patients.model.js";

const get = (options) => {
	return Patient.findOne(options);
};

const create = (id) => {
	return Patient({ user: id }).save();
};

export { get, create };
