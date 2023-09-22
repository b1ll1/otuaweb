import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  clearTravelTimeInformation,
} from "../../slices/navSlice";
import JourneyMetrics from "./JourneyMetrics";

const TravelInput = (props) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const originInputRef = useRef(null);
  const originAutocompleteRef = useRef(null);
  const destinationInputRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  useEffect(() => {
    if (props.google) {
      originAutocompleteRef.current = new props.google.places.Autocomplete(
        originInputRef.current,
        { componentRestrictions: { country: "GB" } }
      );

      destinationAutocompleteRef.current = new props.google.places.Autocomplete(
        destinationInputRef.current,
        { componentRestrictions: { country: "GB" } }
      );

      originAutocompleteRef.current.addListener("place_changed", () => {
        const selectedPlace = originAutocompleteRef.current.getPlace();
        dispatch(
          setOrigin({
            user: props.user,
            data: {
              location: {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng(),
              },
              description: selectedPlace.formatted_address,
            },
          })
        );
      });

      destinationAutocompleteRef.current.addListener("place_changed", () => {
        const selectedPlace = destinationAutocompleteRef.current.getPlace();
        dispatch(
          setDestination({
            user: props.user,
            data: {
              location: {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng(),
              },
              description: selectedPlace.formatted_address,
            },
          })
        );
      });
    }
  }, [dispatch, props.user, props.google]);

  return (
    <div className={`bg-white mx-2 mt-2 shadow-xl`}>
      <div className={`flex flex-row items-center`}>
        <div
          className={`bg-${props.colour}-400 w-10 h-10 rounded-full shadow-lg m-3 flex justify-center items-center`}
        >
          <p className={`text-center text-lg`}>{props.userImage}</p>
        </div>
        <div className={`w-full m-1 flex flex-col`}>
          <input
            ref={originInputRef}
            type="text"
            placeholder="ORIGIN"
            autoComplete="off"
            onChange={() => {
              dispatch(
                setOrigin({
                  user: props.user,
                  data: null,
                })
              );
              dispatch(
                clearTravelTimeInformation({
                  user: props.user,
                })
              );
            }}
          />
          <input
            ref={destinationInputRef}
            type="text"
            placeholder="DESTINATION"
            autoComplete="off"
            onChange={() => {
              dispatch(
                setDestination({
                  user: props.user,
                  data: null,
                })
              );
              dispatch(
                clearTravelTimeInformation({
                  user: props.user,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelInput;
