import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {debounce} from "lodash"



const SearchDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // Pour gérer le focus
  const [loading, setLoading] = useState(false);

  // Utilisation de debounce pour limiter la fréquence des requêtes
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setDoctors([]); // Effacer les résultats si le champ est vide
        return;
      }

      setLoading(true); // Afficher l'indicateur de chargement
      try {
        const response = await axios.get(
          `/api/search/doctors?searchTerm=${searchTerm}`,
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Erreur lors de la recherche des médecins", error);
      } finally {
        setLoading(false); // Cacher l'indicateur de chargement
      }
    }, 300), // Attendre 300ms après la dernière frappe avant de lancer la recherche
    [],
  );

  // Cette fonction est appelée à chaque changement du champ de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    debouncedSearch(searchTerm); // Appeler la fonction debouncée à chaque changement de searchTerm
    // Annuler le debounce au démontage pour éviter les fuites de mémoire
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]); // Re-exécuter si searchTerm change

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Affichage des résultats sous l'input si searchTerm n'est pas vide et l'input est focus */}
      {isFocused && searchTerm && doctors.length > 0 && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white p-2 shadow-lg">
          {loading ? (
            <p>Chargement...</p>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor._id} className="border-b p-2">
                {`Dr. ${doctor.firstName} ${doctor.lastName}`}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDoctors;
