import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: {},
  waypoints: null,
  destination: {},
  travelTimeInformation: {},
  hoverState: {},
  decision: {
    driveSeparately: 'green',
    driverDriving: 'red',
    passengerDriving: 'red'
  }
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin[action.payload.user] = action.payload.data;
    },
    setDestination: (state, action) => {
      state.destination[action.payload.user] = action.payload.data;
    },
    setWaypoints: (state, action) => {
        state.waypoints = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation[action.payload.user][action.payload.key] = action.payload.data;
    },
    clearTravelTimeInformation: (state, action) => {
      state.travelTimeInformation[action.payload.user] = {}
    },
    setHoverState: (state, action) => {
      state.hoverState[action.payload.journey] = action.payload.hover
    },
    setDecision: (state, action) => {
      state.decision = action.payload
    }
  },
});

export const { setOrigin, setWaypoints, setDestination, setTravelTimeInformation, clearTravelTimeInformation, setHoverState, setDecision } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectWaypoints = (state) => state.nav.waypoints;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectHoverState = (state) => state.nav.hoverState
export const selectDecision = (state) => state.nav.decision

export default navSlice.reducer;