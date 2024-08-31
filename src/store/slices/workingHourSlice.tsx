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
      state.weeklyData[payload].range.push(newRangeData);
    },
    deleteRange: (
      state,
      {
        payload,
      }: PayloadAction<{
        key: keyof WorkingHourState["weeklyData"];
        rangeIndex: number;
      }>
    ) => {
      console.log(payload);
      const { key, rangeIndex } = payload;
      // const key = payload as keyof WorkingHourState["weeklyData"];
      //state.weeklyData[key].range.push(newRangeData);
      state.weeklyData[key].range = state.weeklyData[key].range.filter(
        (_, index) => index !== rangeIndex
      );
    },

    setCount: (state, { payload }: PayloadAction<number>) => {
      // state.count = payload;
    },
  },
});

export const { addRange, deleteRange, setCount } = workingHourSlice.actions;
export default workingHourSlice.reducer;
