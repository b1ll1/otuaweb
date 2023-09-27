import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDecision,
  selectTravelTimeInformation,
  setDecision,
} from "../../../slices/navSlice";
import CombinedJourneyMetrics from "./CombinedJourneyMetrics";

function Calculation() {
  const [journeyData, setJourneyData] = useState({});
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const dispatch = useDispatch();

  function costCalculator(distance) {
    const cost = ((distance * 1e-3) / 1.609 / 50) * 4.5461 * 1.75;

    return cost;
  }

  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);

    let hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
    return hDisplay + mDisplay;
  }

  useEffect(() => {
    const distanceTravellingSeparately =
      travelTimeInformation["driver"].originToDestination?.distance.value +
      travelTimeInformation["passenger1"]?.originToDestination?.distance.value;
    const distanceWhenDriverDriving =
      travelTimeInformation["driver"]["originToPassengerOrigin"]?.distance
        .value +
      travelTimeInformation["passenger1"]?.originToDestination?.distance.value +
      travelTimeInformation["driver"]["destinationToPassengerDestination"]
        ?.distance.value;
    const distanceWhenPassengerDriving =
      travelTimeInformation["driver"]["originToPassengerOrigin"]?.distance
        .value +
      travelTimeInformation["driver"]?.originToDestination?.distance.value +
      travelTimeInformation["driver"]["destinationToPassengerDestination"]
        ?.distance.value;

    const durationWhenDriverDriving =
      travelTimeInformation["driver"]["originToPassengerOrigin"]?.duration
        .value +
      travelTimeInformation["passenger1"]?.originToDestination?.duration.value +
      travelTimeInformation["driver"]["destinationToPassengerDestination"]
        ?.duration.value;
    const durationWhenPassengerDriving =
      travelTimeInformation["driver"]["originToPassengerOrigin"]?.duration
        .value +
      travelTimeInformation["driver"]?.originToDestination?.duration.value +
      travelTimeInformation["driver"]["destinationToPassengerDestination"]
        ?.duration.value;

    if (
      distanceWhenDriverDriving < distanceTravellingSeparately &&
      distanceWhenDriverDriving <= distanceWhenPassengerDriving
    ) {
      dispatch(
        setDecision({
          driveSeparately: "red",
          driverDriving: "green",
          passengerDriving: "red",
        })
      );
    } else if (
      distanceWhenPassengerDriving < distanceTravellingSeparately &&
      distanceWhenPassengerDriving < distanceWhenDriverDriving
    ) {
      dispatch(
        setDecision({
          driveSeparately: "red",
          driverDriving: "red",
          passengerDriving: "green",
        })
      );
    } else {
      dispatch(
        setDecision({
          driveSeparately: "red",
          driverDriving: "red",
          passengerDriving: "green",
        })
      );
    }

    setJourneyData({
      driverDriving: {
        distance: distanceWhenDriverDriving,
        duration: secondsToHms(durationWhenDriverDriving),
        cost: costCalculator(distanceWhenDriverDriving).toFixed(2),
        driverCost: costCalculator(
          travelTimeInformation["driver"].originToDestination?.distance.value -
            (distanceTravellingSeparately - distanceWhenDriverDriving) / 2
        ).toFixed(2),
        passengerCost: costCalculator(
          travelTimeInformation["passenger1"].originToDestination?.distance
            .value -
            (distanceTravellingSeparately - distanceWhenDriverDriving) / 2
        ).toFixed(2),
      },
      passengerDriving: {
        distance: distanceWhenPassengerDriving,
        duration: secondsToHms(durationWhenPassengerDriving),
        cost: costCalculator(distanceWhenPassengerDriving).toFixed(2),
        driverCost: costCalculator(
          travelTimeInformation["passenger1"].originToDestination?.distance
            .value -
            (distanceTravellingSeparately - distanceWhenPassengerDriving) / 2
        ).toFixed(2),
        passengerCost: costCalculator(
          travelTimeInformation["driver"].originToDestination?.distance.value -
            (distanceTravellingSeparately - distanceWhenPassengerDriving) / 2
        ).toFixed(2),
      },
    });
  }, [travelTimeInformation]);
  return (
    <div>
      <hr className="border-t-2 border-sky-100 mx-2 my-5" />

      <CombinedJourneyMetrics
        driverImage="👨🏼️"
        passengerImage="👤"
        journey="driverDriving"
        colour="sky"
        journeyMetrics={journeyData}
        driver="driver"
        passenger="passenger1"
      />

      <CombinedJourneyMetrics
        driverImage="️👤"
        passengerImage="👨🏼"
        journey="passengerDriving"
        colour="violet"
        journeyMetrics={journeyData}
        driver="passenger1"
        passenger="driver"
      />
    </div>
  );
}

export default Calculation;
