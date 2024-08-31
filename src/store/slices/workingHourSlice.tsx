import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorkingHourData } from "../../components/WorkingHours/workingHours.types";
import { WorkingHourState } from "../../components/WorkingHours/workingHours.types";

const initialState: WorkingHourState = {
  weeklyData: {
    SUN: {
      id: "SUN",
      title: "Sunday",
      range: [],
    },
    MON: {
      id: "MON",
      title: "Monday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    },
    TUE: {
      id: "TUE",

      title: "Tuesday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    },
    WED: {
      id: "WED",
      title: "Wednesday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    },
    THU: {
      id: "THU",
      title: "Thursday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    },
    FRI: {
      id: "FRI",
      title: "Friday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    },
    SAT: {
      id: "SAT",
      title: "Saturday",
      range: [],
    },
  },
};

const newRangeData = {
  start: { hour: "09", minute: "00" },
  end: { hour: "17", minute: "00" },
};

export const workingHourSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
    addRange: (
      state,
      { payload }: PayloadAction<keyof WorkingHourState["weeklyData"]>
    ) => {
      const key = payload as keyof WorkingHourState["weeklyData"];
      state.weeklyData[key].range.push(newRangeData);
    },
    setCount: (state, { payload }: PayloadAction<number>) => {
      // state.count = payload;
    },
  },
});

export const { addRange, setCount } = workingHourSlice.actions;
export default workingHourSlice.reducer;
