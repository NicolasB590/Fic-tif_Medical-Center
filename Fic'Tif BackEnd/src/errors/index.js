// Importation des codes de statut HTTP prédéfinis à partir du module "http-status-codes"
import { StatusCodes } from "http-status-codes";

// Définition d'une classe personnalisée "UnauthenticatedError" qui hérite de la classe native "Error"
class UnauthenticatedError extends Error {
	// Constructeur de la classe, acceptant un message d'erreur en argument
	constructor(message) {
		// Appel au constructeur de la classe parent (Error) pour définir le message d'erreur
		super(message);

		// Attribution d'un nom spécifique à l'erreur, facilitant sa reconnaissance
		this.name = "UnauthenticatedError";

		// Définition du code de statut HTTP pour cette erreur en utilisant le code 401 (Unauthorized)
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

// Exportation de la classe "UnauthenticatedError" pour qu'elle soit utilisable dans d'autres fichiers
export { UnauthenticatedError };
