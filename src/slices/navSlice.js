import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: {},
  waypoints: null,
  destination: {},
  travelTimeInformation: {},
  hoverState: {}
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
    }
  },
});

export const { setOrigin, setWaypoints, setDestination, setTravelTimeInformation, clearTravelTimeInformation, setHoverState } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectWaypoints = (state) => state.nav.waypoints;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectHoverState = (state) => state.nav.hoverState

export default navSlice.reducer;