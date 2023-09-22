import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  selectWaypoints,
  setTravelTimeInformation,
} from "../slices/navSlice";

const Proceed = () => {
  const origin = useSelector(selectOrigin);
  const waypoints = useSelector(selectWaypoints);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const dispatch = useDispatch();
  const disabled = !(
    origin["driver"] !== null &&
    destination["driver"] !== null &&
    origin["passenger1"] !== null &&
    destination["passenger1"] !== null
  );
  const animationVariants = {
    enter: { y: 0, opacity: 1 },
    exit: { y: 1000, opacity: 0 },
  };

  //   const transition = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     if (disabled) {
  //       Animated.timing(transition, {
  //         toValue: 0,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }).start();
  //     } else {
  //       Animated.timing(transition, {
  //         toValue: -66,
  //         duration: 400,
  //         useNativeDriver: true,
  //         easing: Easing.bounce
  //       }).start();
  //     }
  //   }, [disabled]);

  const handlePress = async () => {
    Promise.all([
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin["driver"].description}&destinations=${origin["passenger1"].description}&key=${process.env.REACT_APP_WEB_API}`
      ).then((res) => res.json()),
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${destination["driver"].description}&destinations=${destination["passenger1"].description}&key=${process.env.REACT_APP_WEB_API}`
      ).then((res) => res.json()),
    ]).then((responses) =>
      dispatch(
        setTravelTimeInformation({
          ...travelTimeInformation,
          driverToPassengerOrigin: responses[0].rows[0].elements[0],
          driverToPassengerDestination: responses[1].rows[0].elements[0],
        })
      )
    );
    // )).then(navigation.navigate("CalculationScreen"));
  };

  return (
    <div>
      {!disabled && (
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 1 }}
        >
          <button className="bg-green-400 text-white w-1/2 rounded-xl p-5 m-2 shadow-xl">Calculate Otua</button>
        </motion.div>
      )}
    </div>
    // <Animated.View style={[{transform: [{translateY: transition}]}, `absolute right-2 left-2 -bottom-14`]}>
    //   <TouchableOpacity
    //     style={
    //       disabled
    //         ? tw`bg-gray-200 rounded-xl p-3 mx-3 mb-1 mx-3`
    //         : tw`bg-sky-300 rounded-xl p-3 mx-3`
    //     }
    //     disabled={disabled}
    //     onPress={handlePress}
    //   >
    //     <Text style={tw`text-white text-center text-lg`}>Go</Text>
    //   </TouchableOpacity>
    // </Animated.View>
  );
};

export default Proceed;