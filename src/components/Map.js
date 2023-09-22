import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectHoverState,
  selectOrigin,
} from "../slices/navSlice";

function Map(props) {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const hover = useSelector(selectHoverState);
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const directions = useRef({});
  const directionRenders = useRef({});

  useEffect(() => {
    if (props.google) {
      map.current = new props.google.Map(mapRef.current, {
        center: { lat: 54.5, lng: -3.435973 },
        zoom: 6.6,
      });
    }
  }, [props.google]);

  useEffect(() => {
    if (origin["driver"]?.location) {
      markers.current["driverOrigin"] = new props.google.Marker({
        position: {
          lat: origin["driver"].location.lat,
          lng: origin["driver"].location.lng,
        },
        map: map.current,
        title: "Driver Origin",
      });
    } else {
      if (markers.current["driverOrigin"]) {
        markers.current["driverOrigin"].setMap(null);
        delete markers.current["driverOrigin"];
      }
    }

    if (destination["driver"]?.location) {
      markers.current["driverDestination"] = new props.google.Marker({
        position: {
          lat: destination["driver"].location.lat,
          lng: destination["driver"].location.lng,
        },
        map: map.current,
        title: "Driver Destination",
      });
    } else {
      if (markers.current["driverDestination"]) {
        markers.current["driverDestination"].setMap(null);
        delete markers.current["driverDestination"];
      }
    }

    if (origin["passenger1"]?.location) {
      markers.current["passenger1Origin"] = new props.google.Marker({
        position: {
          lat: origin["passenger1"].location.lat,
          lng: origin["passenger1"].location.lng,
        },
        map: map.current,
        title: "Passenger1 Origin",
      });
    } else {
      if (markers.current["passenger1Origin"]) {
        markers.current["passenger1Origin"].setMap(null);
        delete markers.current["passenger1Origin"];
      }
    }

    if (destination["passenger1"]?.location) {
      markers.current["passenger1Destination"] = new props.google.Marker({
        position: {
          lat: destination["passenger1"].location.lat,
          lng: destination["passenger1"].location.lng,
        },
        map: map.current,
        title: "Passenger1 Destination",
      });
    } else {
      if (markers.current["passenger1Destination"]) {
        markers.current["passenger1Destination"].setMap(null);
        delete markers.current["passenger1Destination"];
      }
    }
  }, [markers, destination, origin]);

  useEffect(() => {
    if (origin["driver"] && destination["driver"]) {
      const directionsService = new props.google.DirectionsService();

      // Request the directions from the Directions API
      directionsService.route(
        {
          origin: origin["driver"].location,
          destination: destination["driver"].location,
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            directions.current["driver"] = response;
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [origin, destination]);

  // if (origin["passenger1"] && destination["passenger1"]) {
  //   const directionsService = new props.google.DirectionsService();

  //   // Request the directions from the Directions API
  //   directionsService.route(
  //     {
  //       origin: origin["passenger1"].location,
  //       destination: destination["passenger1"].location,
  //       travelMode: "DRIVING", // Specify the travel mode (e.g., DRIVING, WALKING, BICYCLING)
  //     },
  //     (response, status) => {
  //       if (status === "OK") {
  //         const directionsRenderer = new props.google.DirectionsRenderer({
  //           directions: response,
  //           map: map.current,
  //           suppressMarkers: true,
  //           polylineOptions: {
  //             strokeColor: "#a78bfa", // Set your desired color here
  //             strokeOpacity: 0.5,
  //             strokeWeight: 6,
  //           },
  //         }); // Store the directions in state
  //       } else {
  //         console.error(`Directions request failed: ${status}`);
  //       }
  //     }
  // //   );
  // }
  //   }

  // }, [props.google, origin, destination, markers]);

  useEffect(() => {
    const bounds = new props.google.LatLngBounds();
    if (Object.keys(markers.current).length > 0) {
      Object.values(markers.current).forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.current.fitBounds(bounds);
    }
  }, [markers, directionRenders, origin, destination]);

  useEffect(() => {
    if (hover["driver"] === true) {
      directionRenders.current["driver"] = new props.google.DirectionsRenderer({
        directions: directions.current["driver"],
        map: map.current,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#38bdf8",
          strokeOpacity: 0.5,
          strokeWeight: 6,
        },
      });
    } else {
      if (directionRenders.current["driver"]) {
        directionRenders.current["driver"].setMap(null);
        delete directionRenders.current["driver"];
      }
    }
  }, [hover]);

  return (
    <div className="flex-grow">
      <div
        className="h-full"
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
}
export default Map;
