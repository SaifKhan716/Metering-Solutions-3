// import { createSlice } from "@reduxjs/toolkit";
// import { fetchMeters, fetchUnassignedIoTMeters, assignUserToMeter, deleteMeter } from "../thunks/meterThunks";
// import { sendDownlinlkCommand } from "../thunks/meterManagementThunks";

// const initialState = {
//     metersAssigned: [],
//     iotMeter: [],
//     loading: false,
//     error: null,
// };

// const meterManagementSlice = createSlice({
//     name: "meter",
//     initialState,
//     reducers: {
//         clearMeters(state) {
//             state.metersAssigned = [];
//         },
//         addMeterInMetering(state, action) {
//             state.metersAssigned = [...state.metersAssigned, action.payload];
//         },
//         addActionHistoryToMeter(state, action) {
//             const { meterId, history } = action.payload;
//             const index = state.metersAssigned.findIndex((m) => m.id === meterId);
//             if (index !== -1) {
//                 state.metersAssigned[index].actionHistory = [
//                     ...(state.metersAssigned[index].actionHistory || []),
//                     history,
//                 ];
//             }
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             //iot Meter builders
//             .addCase(fetchUnassignedIoTMeters.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUnassignedIoTMeters.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.iotMeter = action.payload;
//             })
//             .addCase(fetchUnassignedIoTMeters.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             //metering Meter 
//             .addCase(fetchMeters.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchMeters.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.metersAssigned = action.payload;
//             })
//             .addCase(fetchMeters.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             //addMeter and AssignUser
//             .addCase(assignUserToMeter.fulfilled, (state, action) => {
//                 const updated = action.payload;
//                 const index = state.metersAssigned.findIndex((m) => m.id === updated.id);

//                 if (index !== -1) {
//                     state.metersAssigned[index] = updated;
//                 } else {
//                     state.metersAssigned.push(updated);
//                 }
//             })
//             .addCase(sendDownlinlkCommand.rejected, (state, action) => {
//                 state.error = action.payload || "Failed to send Downlink command";
//             })
//             .addCase(sendDownlinlkCommand.fulfilled, (state, action) => {
//                 const { meterId, history } = action.payload;
//                 const index = state.metersAssigned.findIndex((m) => m.id === meterId);
//                 if (index !== -1) {
//                     state.metersAssigned[index].actionHistory = [
//                         ...(state.metersAssigned[index].actionHistory || []),
//                         history,
//                     ];
//                 }   
//             })
//     },
// });

// export const { clearMeters, addMeterInMetering, addActionHistoryToMeter } = meterManagementSlice.actions;

// export const selectMeteringMeters = (state) => state.meter.metersAssigned;
// export const selectIotMeters = (state) => state.meter.iotMeter;
// export const selectMeterLoading = (state) => state.meter.loading;
// export const selectMeterError = (state) => state.meter.error;

// export default meterManagementSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { fetchMeters, fetchUnassignedIoTMeters, assignUserToMeter, deleteMeter } from "../thunks/meterThunks";
import { sendDownlinlkCommand } from "../thunks/meterManagementThunks";

const initialState = {
    metersAssigned: [],
    iotMeter: [],
    loading: false,
    error: null,
};

const meterManagementSlice = createSlice({
    name: "meter",
    initialState,
    reducers: {
        clearMeters(state) {
            state.metersAssigned = [];
        },
        addMeterInMetering(state, action) {
            state.metersAssigned = [...state.metersAssigned, action.payload];
        },
        addActionHistoryToMeter(state, action) {
            const { meterId, history } = action.payload;
            const index = state.metersAssigned.findIndex((m) => m._id === meterId || m.meterId === meterId);
            if (index !== -1) {
                state.metersAssigned[index].actionHistory = [
                    history,
                    ...(state.metersAssigned[index].actionHistory || [])
                ];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            //iot Meter builders
            .addCase(fetchUnassignedIoTMeters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnassignedIoTMeters.fulfilled, (state, action) => {
                state.loading = false;
                state.iotMeter = action.payload;
            })
            .addCase(fetchUnassignedIoTMeters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //metering Meter 
            .addCase(fetchMeters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeters.fulfilled, (state, action) => {
                state.loading = false;
                state.metersAssigned = action.payload;
            })
            .addCase(fetchMeters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //addMeter and AssignUser
            .addCase(assignUserToMeter.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.metersAssigned.findIndex((m) => m._id === updated._id);

                if (index !== -1) {
                    state.metersAssigned[index] = updated;
                } else {
                    state.metersAssigned.push(updated);
                }
            })
            .addCase(sendDownlinlkCommand.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendDownlinlkCommand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send Downlink command";
            })
            .addCase(sendDownlinlkCommand.fulfilled, (state, action) => {
                state.loading = false;
                const { meterId, actionHistory } = action.payload;
                const index = state.metersAssigned.findIndex((m) => m._id === meterId || m.meterId === meterId);
                if (index !== -1) {
                    state.metersAssigned[index].actionHistory = [
                        actionHistory,
                        ...(state.metersAssigned[index].actionHistory || [])
                    ];
                }   
            })
    },
});

export const { clearMeters, addMeterInMetering, addActionHistoryToMeter } = meterManagementSlice.actions;


export const selectMeteringMeters = (state) => state.meter.metersAssigned;
export const selectIotMeters = (state) => state.meter.iotMeter;
export const selectMeterLoading = (state) => state.meter.loading;
export const selectMeterError = (state) => state.meter.error;

export default meterManagementSlice.reducer;