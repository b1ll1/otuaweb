import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

import Autocomplete from "react-google-autocomplete";
import JourneyMetrics from "./JourneyMetrics";

const TravelInput = (props) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  //   const toInputBoxStyles = StyleSheet.create({
  //     container: {
  //       flex: 0,
  //     },
  //     textInput: `bg-${props.colour}-50 text-${props.colour}-400 text-base`,
  //     description: {
  //       fontSize: 14,
  //     },
  //   });

    useEffect(() => {
      if (origin[props.user] && destination[props.user]) {
        Promise.all([
          fetch(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
              origin[props.user].description
            }&destinations=${destination[props.user].description}&key=${
              process.env.REACT_APP_WEB_API
            }`
          ).then((res) => res.json()),
        ]).then((responses) =>
          dispatch(
            setTravelTimeInformation({
              ...travelTimeInformation,
              [props.user]: {
                originToDestination: responses[0].rows[0].elements[0],
              },
            })
          )
        );
      }
    }, [origin[props.user], destination[props.user]]);

  return (
    <div className={`bg-white mx-3 my-1 rounded-lg shadow-xl`}>
      <div className={`flex flex-row items-center`}>
        <div
          className={`bg-${props.colour}-400 w-10 h-10 rounded-full shadow-lg m-3 flex justify-center items-center`}
        >
          <p className={`text-center text-xl`}>{props.userImage}</p>
        </div>
        <div className={`w-4/5 mt-1 flex flex-col`}>
          <Autocomplete
            placeholder="ORIGIN"
            apiKey={process.env.REACT_APP_APP_API}
            //styles={toInputBoxStyles}
            options={{
              fields: ["formatted_address", "geometry.location"],
              types: ["geocode"],
              componentRestrictions: { country: "gb" },
            }}
            onPlaceSelected={(place) => {
              const updatedOriginEntry = {
                ...origin,
                [props.user]: {
                  location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                  description: place.formatted_address,
                },
              };
              dispatch(setOrigin(updatedOriginEntry));
            }}
            debounce={400}
            // onChange={() => {
            //   dispatch(
            //     setOrigin({
            //       ...origin,
            //       [props.user]: null,
            //     })
            //   );
            //   dispatch(
            //     setTravelTimeInformation({
            //       ...travelTimeInformation,
            //       [props.user]: null,
            //     })
            //   );
            // }}
          />
          <Autocomplete
            placeholder="DESTINATION"
            apiKey={process.env.REACT_APP_APP_API}
            options={{
              fields: ["formatted_address", "geometry.location"],
              types: ["geocode"],
              componentRestrictions: { country: "gb" },
            }}
            onPlaceSelected={(place) => {
              const updatedDestinationEntry = {
                ...destination,
                [props.user]: {
                  location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                  description: place.formatted_address,
                },
              };
              dispatch(setDestination(updatedDestinationEntry));
            }}
            debounce={400}
            // onChange={() => {
            //   dispatch(
            //     setDestination({
            //       ...destination,
            //       [props.user]: null,
            //     })
            //   );
            //   dispatch(
            //     setTravelTimeInformation({
            //       ...travelTimeInformation,
            //       [props.user]: null,
            //     })
            //   );
            // }}
          />
        </div>
      </div>
      {travelTimeInformation[props.user] && (
          <JourneyMetrics user={props.user} colour={props.colour} />
        )}
        {origin[props.user]?.description}
    </div>
  );
};

export default TravelInput;
