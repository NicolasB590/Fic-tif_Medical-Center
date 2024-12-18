import mongoose from "mongoose";

const connectDB = () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.error(error.message);
	}

	const dbconnection = mongoose.connection;
	dbconnection.once("open", () => console.log("Database connected"));
	dbconnection.on("error", (err) => console.log(`Connection error: ${err}`));
};

export default connectDB;
