import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router";
import { useContextCities } from "../hooks/useContextCities";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { Button, cn, Image } from "@heroui/react";
import { useAuth } from "../hooks/useAuth";

export default function Map() {
  const { cities } = useContextCities();
  const { user, handleLogout, isAuthenticated } = useAuth();
  console.log("usss", user, isAuthenticated);
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const navigate = useNavigate();
  const { getPosition, isLoading, position } = useGeoLocation();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  function ChangeCenter({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  function DetectClick() {
    useMapEvent("click", (e) => {
      const lat = e.latlng.lat.toFixed(4);
      const lng = e.latlng.lng.toFixed(4);
      navigate(`/app/form?lat=${lat}&lng=${lng}`);
    });
    return null;
  }

  return (
    <div className="mapContainer">
      <div
        className={cn(
          "flex flex-row-reverse w-56 gap-3 absolute top-5 p-2 bg-black right-0 left-0 m-auto rounded-md justify-center items-center z-[5000]",
          {
            hidden: isAuthenticated
          }
        )}
      >
        <Button
          color="default"
          onPress={handleLogout}
          size="sm"
          className="text-slate-500"
        >
          Logout
        </Button>
        <p className="text-slate-200 z-[5000]">{user?.name}</p>
        <Image
          src={user?.avatar}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full z-[5000]"
        />
      </div>
      <div
        className={cn("flex w-full absolute bottom-8 right-0 justify-center", {
          hidden: position
        })}
      >
        <Button color="primary" onPress={getPosition} className="z-[5000]">
          {isLoading ? "Loading..." : "Use your position"}
        </Button>
      </div>
      <MapContainer
        className="map"
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup className="bg-slate-400 text-xs border-l-3 border-green-500">
              <span className="text-black text-xs">
                {city.emoji}&nbsp;
                {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
