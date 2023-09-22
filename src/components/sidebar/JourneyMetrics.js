import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHoverState,
  selectTravelTimeInformation,
  setHoverState,
} from "../../slices/navSlice";

const JourneyMetrics = (props) => {
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const originToDestinationCost =
    (travelTimeInformation[props.user]?.originToDestination?.distance.value /
      1e3 /
      1.609 /
      50) *
    4.5461 *
    1.75;

  const dispatch = useDispatch();

  return (
    <div
      className={`mx-2 mb-2 rounded-lg transform transition-transform shadow-md border-${props.colour}-500 hover:border-2`}
      onMouseEnter={() =>
        dispatch(setHoverState({ journey: props.user, hover: true }))
      }
      onMouseLeave={() =>
        dispatch(setHoverState({ journey: props.user, hover: false }))
      }
    >
      <div
        className={`bg-${props.colour}-300 rounded-t-lg flex justify-evenly items-center p-2`}
      >
        <div className="bg-white rounded-full w-7 h-7 flex justify-center items-center">
          <p>{props.userImage}</p>
        </div>
        {/* //   <div className={`text-white text-center`}>
    //     📏:{" "}
    //     {travelTimeInformation[props.user]?.originToDestination?.distance.text}
    //   </div>
    //   <div className={`text-white text-center`}>
    //     ⌛:{" "}
    //     {travelTimeInformation[props.user]?.originToDestination?.duration.text}
    //   </div>
    //   <div className={`text-white text-center`}>
    //     💷 : £{originToDestinationCost.toFixed(2)}{" "}
  //   </div> */}
      </div>
      <div className="flex flex-row px-5 bg-white rounded-b-lg">
        <div className="flex flex-col w-1/2 text-start">
          <div>
            {
              travelTimeInformation[props.user]?.originToDestination?.distance
                .text
            }
          </div>
          <div>
            {" "}
            {
              travelTimeInformation[props.user]?.originToDestination?.duration
                .text
            }
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <p className="bg-red-300 rounded-full text-white w-20 py-1">
            £{originToDestinationCost.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JourneyMetrics;
