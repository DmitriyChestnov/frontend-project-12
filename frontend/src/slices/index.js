import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlices.js';

const reducer = combineReducers({
  channels: channelsReducer,
});

export default configureStore({
  reducer,
});
