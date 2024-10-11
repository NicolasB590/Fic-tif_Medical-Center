// Importation des codes de statut HTTP prédéfinis depuis le module "http-status-codes"
import { StatusCodes } from "http-status-codes";

// Fonction middleware "errorHandler" pour gérer les erreurs dans l'application
const errorHandler = (err, _req, res, _next) => {
	// Affiche l'erreur complète dans la console pour aider au débogage
	console.error(err);

	// Définition du message d'erreur à renvoyer dans la réponse.
	// Si l'erreur a un message défini, il est utilisé ; sinon, un message générique est utilisé.
	const msg =
		err.message || "Une erreur s'est produite, veuillez réessayer plus tard";

	// Définition du code de statut HTTP, par défaut 500 (Erreur interne du serveur)
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

	// Vérification si l'erreur est due à une duplication de clé unique dans la base de données MongoDB (code 11000)
	if (err.code === 11000) {
		// En cas de duplication (par exemple, une adresse email déjà utilisée), retourne une réponse avec le code 409 (Conflit)
		return res
			.status(StatusCodes.CONFLICT)
			.json({ msg: "L'adresse email existe déjà" });
	}

	// Si ce n'est pas une erreur de duplication, renvoie une réponse avec le code d'erreur et le message définis précédemment
	res.status(statusCode).json({ msg });
};

// Exportation de la fonction middleware "errorHandler" pour être utilisée dans toute l'application
export default errorHandler;
