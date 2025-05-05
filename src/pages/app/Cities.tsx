import { cn, ScrollShadow, Spinner } from "@heroui/react";
// import { useFetchCities } from "../../hooks/useFetchCities";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router";
import { useContextCities } from "../../hooks/useContextCities";
import { FormatDate } from "../../components/FormatDate";

export default function Cities() {
  // const { data, isPending } = useFetchCities();
  const { cities, isPending, cityInfo, handleDeleteCity } = useContextCities();

  const handleDelete = (id: string) => {
    handleDeleteCity(id);
  };

  if (!isPending && cities?.length === 0) {
    return (
      <div className="w-full mt-10 flex justify-center items-center text-3xl text-red-500">
        <h1>There are no cities</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-5 flex justify-center items-center text-5xl text-white">
      {isPending ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <ScrollShadow
          hideScrollBar
          className="flex w-full flex-col gap-2 h-[430px] overflow-y-scroll px-2"
        >
          {cities
            .slice()
            .reverse()
            ?.map((city) => {
              return (
                <Link
                  to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                  className={cn(
                    "w-full p-2 flex justify-between items-center rounded-md border border-l-green-600 border-l-4",
                    {
                      "border-green-600": cityInfo?.id === city.id,
                      "border-gray-500": cityInfo?.id !== city.id
                    }
                  )}
                  key={city.id}
                >
                  <div className="flex gap-3 items-center">
                    <span className="text-sm">{city.emoji}</span>
                    <h3 className="text-lg">{city.cityName}</h3>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm">{FormatDate(city.date)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete(city.id);
                      }}
                    >
                      <IoMdCloseCircle
                        className="hover:text-red-600"
                        size={18}
                      />
                    </button>
                  </div>
                </Link>
              );
            })}
        </ScrollShadow>
      )}
    </div>
  );
}
