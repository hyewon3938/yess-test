import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TestState {
  count: number;
}

const initialState: TestState = {
  count: 0,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.count = payload;
    },
  },
});

export const { setCount } = testSlice.actions;
export default testSlice.reducer;
