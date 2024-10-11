// Importation des codes de statut HTTP prédéfinis depuis le module "http-status-codes"
import { StatusCodes } from "http-status-codes";

// Middleware "notFound" pour gérer les routes qui n'existent pas
const notFound = (_req, res) => {
	// Renvoie une réponse avec le code 404 (Not Found) et un message en JSON indiquant que la route n'existe pas
	res.status(StatusCodes.NOT_FOUND).json({ msg: "La route n'existe pas" });
};

// Exportation du middleware "notFound" pour être utilisé dans toute l'application
export default notFound;
