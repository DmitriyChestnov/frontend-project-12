import {
  createEntityAdapter,
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes.js';
import {
  selectors as channelsSelectors,
  actions as channelsActions,
} from './channelsSlice.js';

const fetchAllData = async (headers) => {
  const { data } = await axios.get(apiRoutes.data(), headers);
  return data;
};

const fetchDataThunk = createAsyncThunk(
  'channels/fetchDataThunk',
  async (header, { rejectWithValue }) => {
    try {
      return await fetchAllData(header);
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        errorCode: error.response.status,
      });
    }
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const messagesToRemove = Object.values(state.entities)
          .filter((message) => message.channelId === action.payload)
          .map((message) => message.id);

        messagesAdapter.removeMany(state, messagesToRemove);
      });
  },
});

const { actions } = messagesSlice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  selectAll: selectors.selectAll,
  selectById: createSelector(
    [selectors.selectAll, channelsSelectors.selectCurrentChannelId],
    (messages, currentChannelId) => messages.filter(
      ({ channelId }) => channelId === currentChannelId,
    ),
  ),
};

export { actions, customSelectors as selectors };

export default messagesSlice.reducer;
