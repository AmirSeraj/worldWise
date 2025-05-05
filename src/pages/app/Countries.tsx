import { Spinner } from "@heroui/react";
import { useContextCities } from "../../hooks/useContextCities";
// import { useFetchCities } from "../../hooks/useFetchCities";

export default function Countries() {
  // const { data, isPending } = useFetchCities();
  const { cities, isPending } = useContextCities();
  // const handleClose = (id: number) => {
  //   console.log("id", id);
  // };

  if (!isPending && cities?.length === 0) {
    return (
      <div className="w-full mt-10 flex justify-center items-center text-3xl text-red-500">
        <h1>There are no Countries</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 flex justify-center items-center text-5xl text-white">
      {isPending ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {cities?.map((item) => {
            return (
              <div className="flex flex-col gap-2 text-sm text-center rounded-md border border-slate-500 border-l-4 border-l-green-600 w-28 p-3">
                <p>{item.emoji}</p>
                <p>{item.country}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
