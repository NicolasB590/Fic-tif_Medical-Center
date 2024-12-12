import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

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
        const response = await axios.post(`/api/v1/doctors/search`, {
          searchTerm,
        });
        console.log(response.data.searchResult);

        setDoctors(response.data.searchResult);
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
    <div className="invisible relative sm:visible">
      <input
        type="search"
        placeholder="Recherchez un médecin..."
        className="input input-bordered w-1 sm:w-72"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Affichage des résultats sous l'input si searchTerm n'est pas vide et l'input est focus */}
      {isFocused && searchTerm && (
        <ul className="absolute left-0 top-full z-20 mt-1 w-full rounded-xl bg-base-100 p-4 shadow-lg">
          {loading ? (
            <p>Chargement...</p>
          ) : doctors.length === 0 ? (
            <p>Aucun résultat ne correspond à votre recherche.</p>
          ) : (
            doctors.map((doctor) => (
              <li key={doctor._id}>
                <button className="btn btn-ghost w-full">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</button>
                <div className="divider my-1" />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDoctors;
