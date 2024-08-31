import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  WorkingHourState,
  RangeData,
} from "../../components/WorkingHours/workingHours.types";

export const initialState: WorkingHourState = {
  isEdited: false,
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
    setweeklyData: (
      state,
      { payload }: PayloadAction<WorkingHourState["weeklyData"]>
    ) => {
      state.isEdited = false;
      state.weeklyData = payload;
    },
    setIsEdited: (state, { payload }: PayloadAction<boolean>) => {
      state.isEdited = payload;
    },
    addRange: (
      state,
      { payload }: PayloadAction<keyof WorkingHourState["weeklyData"]>
    ) => {
      state.isEdited = true;
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
      const { key, rangeIndex } = payload;
      state.isEdited = true;
      state.weeklyData[key].range = state.weeklyData[key].range.filter(
        (_, index) => index !== rangeIndex
      );
    },
    changeTimeValue: (
      state,
      {
        payload,
      }: PayloadAction<{
        key: keyof WorkingHourState["weeklyData"];
        rangeIndex: number;
        rangeType: keyof RangeData;
        value: string;
      }>
    ) => {
      const { key, rangeIndex, rangeType, value } = payload;
      const [hour, minute] = value.split(":");
      state.isEdited = true;
      state.weeklyData[key].range[rangeIndex][rangeType] = { hour, minute };
    },
  },
});

export const {
  setweeklyData,
  setIsEdited,
  addRange,
  deleteRange,
  changeTimeValue,
} = workingHourSlice.actions;
export default workingHourSlice.reducer;
