/* eslint-disable @typescript-eslint/no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [mapLat, mapLan] = useUrlPosition();
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCityData() {
      if (!mapLat || !mapLan) return;
      try {
        setIsLoadingGeoLocation(true);
        setGeoCodingError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLan}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesn't seem to be a city");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        if (err instanceof Error) {
          setGeoCodingError(err.message);
        } else {
          setGeoCodingError("An unknown error occurred.");
        }
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLan]);
  if (isLoadingGeoLocation) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().slice(0, 10)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => navigate("/app")}>
          Add
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          ← Back
        </Button>
      </div>
    </form>
  );
}
export default Form;
