// Importation du module Mongoose
import mongoose from "mongoose";

// Fonction pour établir la connexion avec la base de données MongoDB
const connectDB = () => {
	try {
		// Tentative de connexion à MongoDB à l'aide de l'URI stockée dans les variables d'environnement
		mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		// En cas d'échec, affichage de l'erreur et arrêt du processus avec un code de sortie 1 (erreur)
		console.error(error.message);
		process.exit(1); // Force la sortie du programme en cas d'échec de connexion
	}

	// Récupération de la connexion active à MongoDB pour écouter des événements
	const dbconnection = mongoose.connection;

	// Événement "open" déclenché lorsque la connexion est établie avec succès
	dbconnection.once("open", () => console.log("Database connected"));

	// Événement "error" déclenché en cas de problème de connexion après la tentative initiale
	dbconnection.on("error", (err) => console.log(`Connection error: ${err}`));
};

// Exportation de la fonction `connectDB` pour pouvoir l'utiliser dans d'autres fichiers
export default connectDB;
