import { combineReducers } from "redux";
import videoReducer from "./video/videoTimeUpdate";

export const rootReducer = combineReducers({
  video: videoReducer,
})