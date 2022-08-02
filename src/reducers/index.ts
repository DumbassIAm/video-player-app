import { combineReducers } from "redux";
import videoReducer from "./video/video";

export const rootReducer = combineReducers({
  video: videoReducer,
})