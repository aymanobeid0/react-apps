/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useCities } from "../contexts/CityContext";

function Map() {
  const [searchParams] = useSearchParams();
  const [position, setPosition] = useState<LatLngExpression | undefined>([
    40, 0,
  ]);
  // const navigate = useNavigate();
  const { cities } = useCities();
  const mapLang = searchParams.get("lng");
  const maplat = searchParams.get("lat");

  useEffect(() => {
    if (mapLang && maplat) {
      setPosition([Number(maplat), Number(mapLang)]);
    }
  }, [mapLang, maplat]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position!.lat, city.position!.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position!} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);

  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    console.log(e);
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
  return null;
}
export default Map;
