import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDecision, setHoverState } from "../../../slices/navSlice";

function CombinedJourneyMetrics(props) {
  const decision = useSelector(selectDecision);
  const dispatch = useDispatch();

  return (
    <div
      className={`mx-2 mb-2 rounded-lg transform transition-transform shadow-md border-${props.colour}-500 hover:border-2`}
      onMouseEnter={() =>
        dispatch(setHoverState({ journey: props.journey, hover: true }))
      }
      onMouseLeave={() =>
        dispatch(setHoverState({ journey: props.journey, hover: false }))
      }
    >
      <div
        className={`bg-${props.colour}-300 rounded-t-lg flex justify-evenly items-center p-2`}
      >
        <div className="bg-white rounded-full h-7 flex flex-row justify-center items-center px-2">
          <p>{props.driverImage}</p>
          <p className="px-4">➡️</p>
          <p>{props.passengerImage}</p>
        </div>
      </div>
      <div className="flex flex-row px-5 bg-white rounded-b-lg">
        <div className="flex flex-col w-1/2 text-start justify-center">
          <div>
            {(props.journeyMetrics[props.journey]?.distance * 1e-3).toFixed(1)}
            km
          </div>
          <div> {props.journeyMetrics[props.journey]?.duration}</div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center p-2">
          <p
            className={`rounded-full w-24 py-1 m-1 border-2 border-${props.colour}-300`}
          >
            £{props.journeyMetrics[props.journey]?.cost}
          </p>
          <div className="flex">
            <p
              className={`bg-${
                decision[props.journey]
              }-300 rounded-full text-white w-24 py-1 mx-1`}
            >
              {props.driverImage}{" "}
              {props.journeyMetrics[props.journey]?.driverCost}
            </p>
            <p
              className={`bg-${
                decision[props.journey]
              }-300 rounded-full text-white w-24 py-1 mx-1`}
            >
              {props.passengerImage}{" "}
              {props.journeyMetrics[props.journey]?.passengerCost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedJourneyMetrics;
