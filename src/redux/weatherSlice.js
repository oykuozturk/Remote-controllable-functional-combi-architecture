/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { query } from "./api/weatherApi-config";

const initialState = {
  isLoading: false,
  error: null,
  current: {},
  forecast: [],
};

export const takeWeatherApi = createAsyncThunk(
  "weather/fetchWeather",
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const response = await axios.get(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearForecast: (state) => {
      state.forecast = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(takeWeatherApi.fulfilled, (state, action) => {
        const { condition, temp_c, wind_kph, humidity, feelslike_c } =
          action.payload.current;
        const { daily_chance_of_rain } =
          action.payload.forecast.forecastday[0].day;
        const { date } = action.payload.forecast.forecastday[0];
        const { sunrise } = action.payload.forecast.forecastday[0].astro;
        const current = {
          condition,
          sunrise,
          date,
          temp_c,
          feelslike_c,
          humidity,
          wind_kph,
          daily_chance_of_rain,
        };
        state.current = current;
        action.payload.forecast.forecastday[0].hour.map((hour) => {
          const { condition, time, temp_c } = hour;
          const forecast = { condition, time, temp_c };
          state.forecast.push(forecast);
        });
        state.isLoading = false;
      })
      .addCase(takeWeatherApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(takeWeatherApi.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { clearForecast } = weatherSlice.actions;
export default weatherSlice.reducer;
