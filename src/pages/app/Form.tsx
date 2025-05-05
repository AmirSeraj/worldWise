import { Button, DatePicker, Input, Spinner, Textarea } from "@heroui/react";
import { useNavigate, useSearchParams } from "react-router";
import BackButton from "../../components/BackButton";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../../Type";
import { useJalaliDate } from "../../hooks/useJalaliDate";
import { useContextCities } from "../../hooks/useContextCities";

export default function Form() {
  const [cityInfo, setCityInfo] = useState<any>([]);
  const [isLoadingGeo, setIsLoadingGeo] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { handleSaveCity, isPending } = useContextCities();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        if (!res.ok) {
          throw new Error("Error fetching data");
        }

        const data = await res.json();
        setCityInfo(data);
      } catch (error) {
        return Error("error in fetching data");
      } finally {
        setIsLoadingGeo(false);
      }
    }
    if (lat && lng) {
      fetchCityData();
    }
  }, [lat, lng]);

  if (!lat && !lng) {
    return (
      <p className="text-center text-red-500 text-lg mt-5">
        Start by click somewhere in the map!
      </p>
    );
  }

  const { register, handleSubmit, control, setValue } = useForm<FormInputs>({
    defaultValues: {
      date: null,
      cityName: ""
    }
  });

  useEffect(() => {
    if (cityInfo?.locality) {
      setValue("cityName", cityInfo.locality);
    }
  }, [cityInfo?.locality, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Fwfwfgr");
    console.log(data);
    if (!data.cityName || !data.date) {
      return;
    }

    const newDate = useJalaliDate(data.date);

    const newCity = {
      cityName: data.cityName,
      country: cityInfo.countryName,
      emoji: cityInfo.localityLanguageRequested,
      date: newDate,
      notes: data.note,
      position: {
        lat: Number(lat),
        lng: Number(lng)
      },
      id: Date.now().toString(36).substring(2, 9)
    };

    await handleSaveCity(newCity);
    navigate("/app/cities");
  };

  return (
    <div className="w-full h-full flex flex-col gap-7 items-center mt-3 bg-slate-600 text-white rounded-lg p-4">
      {isLoadingGeo ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4 items-center"
        >
          <Controller
            name="cityName"
            control={control}
            rules={{ required: "City name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="City name"
                className="w-2/3 text-black"
                labelPlacement="outside"
                placeholder="city name"
                isRequired
                value={field.value || cityInfo?.locality || ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                className="w-2/3"
                labelPlacement="outside"
                label="When did you go to?"
                isRequired
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Textarea
            isRequired
            label="Notes about your trip to?"
            className="w-2/3"
            labelPlacement="outside"
            placeholder="Enter your description"
            {...register("note", { required: true })}
          />

          {/* {errors.exampleRequired && <span>This field is required</span>} */}

          <div className="w-2/3 flex justify-between items-center">
            <Button isLoading={isPending} color="success" type="submit">
              ADD
            </Button>
            <BackButton />
          </div>
        </form>
      )}
    </div>
  );
}
