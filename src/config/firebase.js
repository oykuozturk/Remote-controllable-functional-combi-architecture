/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { set, ref } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./config";

import {
  setActive,
  setAutomatic,
  setTargetTemp,
  setManual,
  setMode,
} from "../redux/firebaseSlice";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtDb = getDatabase(app);

export const rdSetActive = (value, dispatch) => {
  dispatch(setActive(value));
  set(ref(rtDb, "active/"), value);
};
export const rdSetAutomatic = (value, dispatch) => {
  dispatch(setAutomatic(value));
  set(ref(rtDb, "automatic/"), value);
};
export const rdSetTargetTemp = (value, dispatch) => {
  dispatch(setTargetTemp(value));

  set(ref(rtDb, "targetTemp/"), parseInt(value));
};
export const rdSetManual = (value, dispatch) => {
  dispatch(setManual(value));
  set(ref(rtDb, "manual/"), value);
};
export const rdSetMode = (value, dispatch) => {
  dispatch(setMode(value));
  set(ref(rtDb, "mode/"), value);
};

export const changeAll = (value, dispatch, type) => {
  rdSetAutomatic(value.auto, dispatch);
  rdSetManual(value.man, dispatch);
  rdSetActive(value.act, dispatch);
  rdSetMode(value.mods, dispatch);
  if (type === "manual") {
    rdSetTargetTemp(value.ttemp, dispatch);
  }
};
