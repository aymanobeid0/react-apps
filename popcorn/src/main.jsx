import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";
import App from "./App.jsx";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={5} color="blue" onSetRating={setMovieRating} />
      <p>this movie was rated {movieRating} stars</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={48} color="red" className="test" defaultRating={3} />
    <Test /> */}
  </StrictMode>
);
