import Patient from "./patients.model.js";

const get = (id) => {
	return Patient.find({ user: id });
};

const create = (id) => {
	return Patient({ user: id }).save();
};

export { get, create };
