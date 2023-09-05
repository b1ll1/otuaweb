import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationPin from "./LocationPin";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";

function MapContainer(props) {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  return (
    <Map
      google={props.google}
      zoom={6.6}
      initialCenter={{
        lat: 55.378051,
        lng: -3.435973,
      }}
    >
      {/* {origin["driver"] && destination["driver"] && (
        <MapViewDirections
          origin={origin["driver"].description}
          destination={destination["driver"].description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#0284c7"
        />
      )} */}
      {origin["driver"]?.location && (
        <Marker
          position={{
            lat: origin["driver"].location.lat,
            lng: origin["driver"].location.lng,
          }}
          title="Driver Origin"
          description={origin["driver"].description}
          identifier="driverOrigin"
          pinColor="#7DD3FC"
        />
      )}
      {destination["driver"]?.location && (
        <Marker
          position={{
            lat: destination["driver"].location.lat,
            lng: destination["driver"].location.lng,
          }}
          title="Driver Destination"
          description={destination["driver"].description}
          identifier="driverDestination"
          pinColor="#7DD3FC"
        />
      )}
      {/* {origin["passenger1"] && destination["passenger1"] && (
        <MapViewDirections
          origin={origin["passenger1"].description}
          destination={destination["passenger1"].description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#7c3aed"
        />
      )} */}

      {origin["passenger1"]?.location && (
        <Marker
          position={{
            lat: origin["passenger1"].location.lat,
            lng: origin["passenger1"].location.lng,
          }}
          title="Passenger Origin"
          description={origin["passenger1"].description}
          identifier="passengerOrigin"
          pinColor="#c4b5fd"
        />
      )}

      {destination["passenger1"]?.location && (
        <Marker
          position={{
            lat: destination["passenger1"].location.lat,
            lng: destination["passenger1"].location.lng,
          }}
          title="Passenger Destination"
          description={destination["passenger1"].description}
          identifier="passengerDestination"
          pinColor="#c4b5fd"
        />
      )}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_APP_API,
})(MapContainer);
