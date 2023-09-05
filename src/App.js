import logo from "./logo.svg";
import "./App.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Map from "./components/Map";
import { selectOrigin } from "./slices/navSlice";
import { useSelector } from "react-redux";
import TravelInput from "./components/TravelInput";

function App() {
  const [value, setValue] = useState(null);
  const origin = useSelector(selectOrigin);

  const handleClick = () => {
    fetch("https://monzo.me/test/19.00", { method: "GET" });
  };

  return (
    <div className="App min-h-screen bg-sky-50">
      <Navbar />
      <TravelInput userImage="👨🏼️" user="driver" colour="sky" />
      <TravelInput userImage="👤" user="passenger1" colour="violet" />
      <Map />

      <button
        className="bg-blue-950 text-white p-5 rounded-xl mt-5"
        onClick={handleClick}
      >
        Create payment link
      </button>
    </div>
  );
}

export default App;
