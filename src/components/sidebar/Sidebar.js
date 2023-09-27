import React, { useEffect } from "react";
import TravelInput from "./TravelInput";
import JourneyMetrics from "./JourneyMetrics";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDecision,
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  setDecision,
  setTravelTimeInformation,
} from "../../slices/navSlice";
import Calculation from "./journeyCalculations/Calculation";

function Sidebar(props) {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  useEffect(() => {
    if (origin["driver"] && destination["driver"]) {
      const distanceMatrixService = new props.google.DistanceMatrixService();

      const request = {
        origins: [origin["driver"].location],
        destinations: [destination["driver"].location],
        travelMode: "DRIVING",
      };

      distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === "OK") {
          dispatch(
            setTravelTimeInformation({
              user: "driver",
              key: "originToDestination",
              data: response.rows[0].elements[0],
            })
          );
        } else {
          console.error("Error:", status);
        }
      });
    }

    if (origin["passenger1"] && destination["passenger1"]) {
      const distanceMatrixService = new props.google.DistanceMatrixService();

      const request = {
        origins: [origin["passenger1"].location],
        destinations: [destination["passenger1"].location],
        travelMode: "DRIVING",
      };

      distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === "OK") {
          dispatch(
            setTravelTimeInformation({
              user: "passenger1",
              key: "originToDestination",
              data: response.rows[0].elements[0],
            })
          );
        } else {
          console.error("Error:", status);
        }
      });
    }

    if (origin["driver"] && origin["passenger1"]) {
      const distanceMatrixService = new props.google.DistanceMatrixService();

      const request = {
        origins: [origin["driver"].location],
        destinations: [origin["passenger1"].location],
        travelMode: "DRIVING",
      };

      distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === "OK") {
          dispatch(
            setTravelTimeInformation({
              user: "driver",
              key: "originToPassengerOrigin",
              data: response.rows[0].elements[0],
            })
          );
        } else {
          console.error("Error:", status);
        }
      });
    }

    if (destination["driver"] && destination["passenger1"]) {
      const distanceMatrixService = new props.google.DistanceMatrixService();

      const request = {
        origins: [destination["driver"].location],
        destinations: [destination["passenger1"].location],
        travelMode: "DRIVING",
      };

      distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === "OK") {
          dispatch(
            setTravelTimeInformation({
              user: "driver",
              key: "destinationToPassengerDestination",
              data: response.rows[0].elements[0],
            })
          );
        } else {
          console.error("Error:", status);
        }
      });
    }

    if (
      !(
        origin["driver"] &&
        destination["driver"] &&
        origin["passenger1"] &&
        destination["passenger1"]
      )
    ) {
      dispatch(
        setDecision({
          driveSeparately: "green",
          driverDriving: "red",
          passengerDriving: "red",
        })
      );
    }
  }, [origin, destination, dispatch]);

  return (
    <div className="flex flex-col w-[36rem] bg-sky-200">
      <TravelInput
        userImage="👨🏼️"
        user="driver"
        colour="sky"
        google={props.google}
      />
      <TravelInput
        userImage="👤"
        user="passenger1"
        colour="violet"
        google={props.google}
      />
      <hr className="border-t-2 border-sky-100 mx-2 my-5" />
      {typeof travelTimeInformation["driver"] !== "undefined" &&
        Object.keys(travelTimeInformation["driver"]).length > 0 && (
          <JourneyMetrics user="driver" colour="sky" userImage="👨🏼️" />
        )}
      {typeof travelTimeInformation["passenger1"] !== "undefined" &&
        Object.keys(travelTimeInformation["passenger1"]).length > 0 && (
          <JourneyMetrics user="passenger1" colour="violet" userImage="👤" />
        )}
      {typeof travelTimeInformation["driver"] !== "undefined" &&
        Object.keys(travelTimeInformation["driver"]).length > 0 &&
        typeof travelTimeInformation["passenger1"] !== "undefined" &&
        Object.keys(travelTimeInformation["passenger1"]).length > 0 && (
          <Calculation />
        )}
      <div className="bg-violet-400"></div>
    </div>
  );
}

export default Sidebar;

// Driver and Passenger travel separately.
// Driver picks up Passenger, goes to Passenger Destination and then continues onto own Destination.
// Passenger picks up Driver, goes to Driver Destination and then continues onto own Destination.
