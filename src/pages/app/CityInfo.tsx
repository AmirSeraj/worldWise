import { Link, useParams } from "react-router";
import { useContextCities } from "../../hooks/useContextCities";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";
import { FormatDate } from "../../components/FormatDate";
import BackButton from "../../components/BackButton";

export default function CityInfo() {
  const { id } = useParams();
  const { cityInfo, isPending, handleCityInfo } = useContextCities();
  useEffect(() => {
    if (id) {
      handleCityInfo(id);
    }
  }, [id]);

  return (
    <div className="w-full p-5 rounded-md bg-gray-700 mt-7 flex flex-col gap-3">
      {isPending ? (
        <div className="flex w-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-0.5">
            <p className="text-slate-400 uppercase text-xs">cityname</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{cityInfo?.emoji}</span>
              <h1 className="text-xl text-white">{cityInfo?.cityName}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-slate-400 uppercase text-xs">
              you went to madrid on
            </p>
            <p className="text-xl text-white">{FormatDate(cityInfo?.date)}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-slate-400 uppercase text-xs">learn more</p>
            <Link to={"/amirserajjj"} className="text-xl text-white underline">
              Cheackout {cityInfo?.cityName} on google map
            </Link>
          </div>
          <BackButton />
        </>
      )}
    </div>
  );
}
