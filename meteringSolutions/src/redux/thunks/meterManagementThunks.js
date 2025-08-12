import { createAsyncThunk } from '@reduxjs/toolkit';
import { meterApi } from '../../api/apiService';

export const sendDownlinlkCommand = createAsyncThunk('meterManagement/sendDownlinkCommand', async ( {payload, port }, { rejectWithValue }) => {
    try {
        console.log("Sending downlink command with payload:", payload, "and port:", port);

        const response = await meterApi.sendDownlink(payload, port);    
        return response.data;
    } catch (error) {
        console.error("Error sending downlink command:", error);
        return rejectWithValue(error.response.data);
    }   
});
