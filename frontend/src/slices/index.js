import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import channelIdReducer from './channelIdSlice.js';

const reducer = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  channelId: channelIdReducer,
});

export default configureStore({
  reducer,
});
