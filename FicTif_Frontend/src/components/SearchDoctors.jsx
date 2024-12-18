import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});
import { debounce } from "lodash";
import { Link } from "react-router-dom";

const SearchDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setDoctors([]);
        return;
      }

      setLoading(true);
      try {
        const response = await apiClient.post(`/api/v1/doctors/search`, {
          searchTerm,
        });
        console.log(response.data.searchResult);

        setDoctors(response.data.searchResult);
      } catch (error) {
        console.error("Erreur lors de la recherche des médecins", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div
      className="invisible relative sm:visible"
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        type="search"
        placeholder="Recherchez un médecin..."
        className="input input-bordered w-1 sm:w-72"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
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
                <Link
                  to={{
                    pathname: "/doctorPage/",
                    search: `?id=${doctor._id}`,
                  }}
                >
                  <button
                    className="btn btn-ghost flex w-full flex-row justify-between"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</span>
                    <span>{`- ${doctor.speciality === null ? "Généraliste" : doctor.speciality}`}</span>
                  </button>
                </Link>

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
