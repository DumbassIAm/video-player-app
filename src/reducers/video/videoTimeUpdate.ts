import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface VideoTimeUpdateInterface {
  currentTime: number,
}

const initialState = {
  currentTime: 0,
} as VideoTimeUpdateInterface;

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    }
  }
})

export const { updateCurrentTime } = videoSlice.actions;
export default videoSlice.reducer;