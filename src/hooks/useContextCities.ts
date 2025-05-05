import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

export const useContextCities = () => useContext(CitiesContext);
