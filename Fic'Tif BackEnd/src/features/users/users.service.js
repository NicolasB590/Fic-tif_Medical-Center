import User from "./users.model.js";

const get = (email) => {
	return User.findOne(email);
};

const getAllByOptions = async (options) => {
	let query = {};

	if (options) {
		if (options._id) {
			query._id = options._id;
		}
		if (options.firstName) {
			query.firstName = options.firstName;
		}
		if (options.lastName) {
			query.lastName = options.lastName;
		}
		if (options.email) {
			query.email = options.email;
		}
		if (options.adress) {
			query.adress = options.adress;
		}
		if (options.phoneNumber) {
			query.phoneNumber = options.phoneNumber;
		}
	}

	const users = await User.find(query).select("-_id -password -role");

	return users;
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

const isLogged = () => {
	return User.findOne(email).select("-password -role");
};

export { get, update, remove, create, getAllByOptions, isLogged };
