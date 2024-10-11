import Patient from "./patients.model.js";

const get = (id) => {
	return Patient.findById(id);
};

const create = (id) => {
	return Patient({ user: id }).save();
};

export { get, create };
