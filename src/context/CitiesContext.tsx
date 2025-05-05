import React, { createContext, useEffect, useReducer } from "react";
import { Action, CityContextType, CityInfoType } from "../Type";

const initialState = {
  isPending: true,
  cities: [],
  cityInfo: {
    id: "",
    cityName: "",
    emoji: "",
    date: "",
    position: {
      lat: 0,
      lng: 0
    }
  },
  errorText: "",
  handleCityInfo: async () => Promise.resolve(),
  handleSaveCity: async () => Promise.resolve(),
  handleDeleteCity: async () => Promise.resolve()
};

const CitiesContext = createContext<CityContextType>(initialState);

function reducer(state: CityContextType, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isPending: true };
    case "cities/loaded":
      return { ...state, isPending: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isPending: false, cityInfo: action.payload };
    case "city/created":
      return {
        ...state,
        isPending: false,
        cities: [...state.cities, action.payload]
      };
    case "city/deleted":
      return {
        ...state,
        isPending: false,
        cities: state.cities.filter((city) => city.id !== action.payload)
      };
    case "rejected":
      return { ...state, isPending: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ isPending, cities, cityInfo, errorText }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleFetchCities = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch("http://localhost:8000/cities", {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error fetching cities" });
    }
  };

  const handleCityInfo = async (id: string) => {
    if (id === cityInfo.id) return;
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error fetching city info" });
    }
  };

  const handleSaveCity = async (newCity: CityInfoType) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error in save city" });
    }
  };

  const handleDeleteCity = async (id: string) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error in deleting city" });
    }
  };

  useEffect(() => {
    handleFetchCities();
  }, []);

  const values = {
    isPending,
    cities,
    cityInfo,
    errorText,
    handleCityInfo,
    handleSaveCity,
    handleDeleteCity
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
};

export { CitiesContext, CityProvider };
