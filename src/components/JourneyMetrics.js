import React from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const JourneyMetrics = (props) => {
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const originToDestinationCost =
    (travelTimeInformation[props.user]?.originToDestination?.distance.value /
      1e3 /
      1.609 /
      50) *
    4.5461 *
    1.75;
  return (
    <div
      className={`bg-${props.colour}-300 rounded-b-lg flex justify-evenly items-center p-2`}
    >
      <div className={`text-white text-center`}>
        📏:{" "}
        {travelTimeInformation[props.user]?.originToDestination?.distance.text}
      </div>
      <div className={`text-white text-center`}>
        ⌛:{" "}
        {travelTimeInformation[props.user]?.originToDestination?.duration.text}
      </div>
      <div className={`text-white text-center`}>
        💷 : £{originToDestinationCost.toFixed(2)}{" "}
      </div>
    </div>
  );
};

export default JourneyMetrics;
