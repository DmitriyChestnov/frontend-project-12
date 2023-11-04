import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from './routes.js';

const fetchAllData = async (headers) => {
  const { data } = await axios.get(routes.data(), headers);
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

export default fetchDataThunk;
