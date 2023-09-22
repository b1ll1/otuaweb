import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Map from "./components/Map";
// import { selectOrigin } from "./slices/navSlice";
// import { useSelector } from "react-redux";
import TravelInput from "./components/sidebar/TravelInput";
// import Mapp from "./components/Map";
import googleMapsLoaderPromise from "./components/googleMapsLoader";
import Proceed from "./components/Proceed";
import JourneySummary from "./components/JourneySummary";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [googleMaps, setGoogleMaps] = useState(null);

  useEffect(() => {
    function onGoogleMapsAPILoaded(googleObject) {
      console.log("Google Maps API Loaded:", googleObject);
      setGoogleMaps(googleObject);
    }
    googleMapsLoaderPromise(onGoogleMapsAPILoaded);
  }, []);

  // const [value, setValue] = useState(null);
  // const origin = useSelector(selectOrigin);

  // const handleClick = () => {
  //   fetch("https://monzo.me/test/19.00", { method: "GET" });
  // };

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow">
        <Sidebar google={googleMaps} />
        <Map google={googleMaps} />
      </div>
      {/* <Proceed /> */}
      {/* <div className="flex">
        <JourneySummary
          summary={{
            avatar: "👨🏼",
            colour: "sky",
            initialDistance: "10km",
            initialTime: "1h30",
            initialCost: "10",
          }}
        />
        <JourneySummary
          summary={{
            avatar: "👤",
            colour: "violet",
            initialDistance: "10km",
            initialTime: "1h30",
            initialCost: "10",
          }}
        />
      </div> */}
      {/* <button
        className="bg-blue-950 text-white p-5 rounded-xl mt-5"
        onClick={handleClick}
      >
        Create payment link
      </button> */}
    </div>
  );
}

export default App;
