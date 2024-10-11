import User from "./users.model.js";

const get = (id) => {
	return User.findById(id);
};

const getAll = () => {
	return User.find({});
};

const update = (id, change) => {
	return User.findByIdAndUpdate(id, change);
};

const remove = (id) => {
	return User.findByIdAndDelete(id);
};

const create = (data) => {
	return User(data).save();
};

export { get, getAll, update, remove, create };
