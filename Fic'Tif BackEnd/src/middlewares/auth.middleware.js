import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticateUser = (req, _res, next) => {
	const token = req.signedCookies.accessToken || null;

	if (!token) {
		throw new UnauthenticatedError("Pas de token fournit");
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const { id, email } = decodedToken;
		req.user = { id, email };

		next();
	} catch (error) {
		throw new UnauthenticatedError("Accès non autorisé");
	}
};

export default authenticateUser;
