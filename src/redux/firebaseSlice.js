/** @format */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  temp: 0,
  hum: 0,
  manual: false,
  automatic: false,
  active: false,
  targetTemp: 0,
  mode: "Kapalı",
};

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    onTempChange: (state, action) => {
      state.temp = action.payload;
    },
    onHumChange: (state, action) => {
      state.hum = action.payload;
    },
    setManual: (state, action) => {
      state.manual = action.payload;
    },
    setAutomatic: (state, action) => {
      state.automatic = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setTargetTemp: (state, action) => {
      state.targetTemp = parseInt(action.payload);
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  onTempChange,
  onHumChange,
  setActive,
  setAutomatic,
  setManual,
  setTargetTemp,
  setMode,
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
