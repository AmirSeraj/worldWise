import { useQuery } from "@tanstack/react-query";

type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
};

export function useFetchCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async (): Promise<Array<City>> => {
      const response = await fetch("http://localhost:8000/cities");
      return await response.json();
    }
  });
}
